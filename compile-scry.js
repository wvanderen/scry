#!/usr/bin/env node

/**
 * Unified Scry compiler
 * - Generates Claude command wrappers for all Scry entities, agents, and workflows
 * - Copies research/reference docs so personas stay canonical inside .bmad
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = __dirname;
const SCRY_DIR = path.join(PROJECT_ROOT, '.bmad', 'scry');
const COMMANDS_DIR = path.join(PROJECT_ROOT, '.claude', 'commands', 'bmad', 'scry');
const WORKFLOW_EXECUTOR = path.join(PROJECT_ROOT, '.bmad', 'core', 'tasks', 'workflow.xml');

const RESEARCH_MARKERS = [
  'A Comprehensive Profile for an AI Agent Persona',
  'In-Depth Analysis of',
  'The creation of an artificial intelligence persona'
];

function relPathForPrompt(absPath) {
  return `@${path.relative(PROJECT_ROOT, absPath).replace(/\\/g, '/')}`;
}

function writeFileEnsuringDir(targetPath, contents) {
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, contents);
}

function cleanOutputDir() {
  if (fs.existsSync(COMMANDS_DIR)) {
    fs.rmSync(COMMANDS_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(COMMANDS_DIR, { recursive: true });
}

function readDirSafe(dir) {
  return fs.existsSync(dir) ? fs.readdirSync(dir, { withFileTypes: true }) : [];
}

function isResearchDoc(filePath) {
  if (!fs.existsSync(filePath)) return false;
  const content = fs.readFileSync(filePath, 'utf8');
  return RESEARCH_MARKERS.some(marker => content.includes(marker));
}

function gatherFiles(root, predicate) {
  const results = [];
  function walk(current) {
    if (!fs.existsSync(current)) return;
    for (const dirent of fs.readdirSync(current, { withFileTypes: true })) {
      const fullPath = path.join(current, dirent.name);
      if (dirent.isDirectory()) {
        walk(fullPath);
      } else if (dirent.isFile() && predicate(dirent.name)) {
        results.push(fullPath);
      }
    }
  }
  walk(root);
  return results;
}

function buildWrapper({ name, description, steps, blockTag, intro }) {
  const formattedSteps = steps.map((step, idx) => `${idx + 1}. ${step}`).join('\n');
  return `---
name: '${name}'
description: '${description}'
---

${intro || 'Follow these steps exactly and do not improvise outside the instructions.'}

<${blockTag} CRITICAL="TRUE">
${formattedSteps}
</${blockTag}>
`;
}

function findSidecarDirectory(name, baseDir, searchRoot) {
  const directCandidate = path.join(baseDir, `${name}-sidecar`);
  if (fs.existsSync(directCandidate) && fs.lstatSync(directCandidate).isDirectory()) {
    return directCandidate;
  }

  const normalized = name.toLowerCase();
  for (const dirent of readDirSafe(searchRoot)) {
    if (!dirent.isDirectory()) continue;
    const lower = dirent.name.toLowerCase();
    const matchesExplicit = lower === `${normalized}-sidecar`;
    const matchesPrefix = lower.startsWith(normalized) && lower.endsWith('-sidecar');
    if (matchesExplicit || matchesPrefix) {
      return path.join(searchRoot, dirent.name);
    }
  }
  return null;
}

function describeSidecarStep(sidecarDir) {
  const interestingPaths = [
    'instructions.md',
    'memories.md',
    'knowledge',
    'knowledge/README.md'
  ];

  const existing = interestingPaths
    .map(rel => path.join(sidecarDir, rel))
    .filter(candidate => fs.existsSync(candidate));

  if (existing.length) {
    const rendered = existing
      .map(candidate => {
        const suffix = fs.lstatSync(candidate).isDirectory() ? ' (directory)' : '';
        return `${relPathForPrompt(candidate)}${suffix}`;
      })
      .join(', ');
    return `LOAD the supporting sidecar resources ${rendered} before continuing.`;
  }

  return `LOAD all supporting resources under ${relPathForPrompt(sidecarDir)} exactly as the agent instructions require.`;
}

function locatePersonaDoc(name, agentFile, entitiesRoot) {
  const candidates = [
    path.join(path.dirname(agentFile), `${name}.md`),
    path.join(entitiesRoot, name, `${name}.md`)
  ];
  return candidates.find(candidate => fs.existsSync(candidate));
}

function compileEntities() {
  const entitiesRoot = path.join(SCRY_DIR, 'entities');
  const result = { compiled: [], research: [] };
  if (!fs.existsSync(entitiesRoot)) {
    console.warn(`⚠️  Entities directory not found at ${entitiesRoot}`);
    return result;
  }

  const agentFiles = gatherFiles(entitiesRoot, name => name.endsWith('.agent.yaml'));
  if (!agentFiles.length) {
    console.warn(`⚠️  No entity agent files (.agent.yaml) found under ${entitiesRoot}`);
    return result;
  }

  for (const agentFile of agentFiles) {
    const entityName = path.basename(agentFile, '.agent.yaml');
    const personaDoc = locatePersonaDoc(entityName, agentFile, entitiesRoot);
    const personaIsResearch = personaDoc ? isResearchDoc(personaDoc) : false;

    const steps = [];
    if (personaDoc && !personaIsResearch) {
      steps.push(`LOAD the persona file ${relPathForPrompt(personaDoc)} before interacting with the user.`);
    }

    steps.push(`LOAD the FULL agent configuration from ${relPathForPrompt(agentFile)} and obey every constraint (persona, menu, safety).`);

    const sidecarDir = findSidecarDirectory(entityName, path.dirname(agentFile), entitiesRoot);
    if (sidecarDir) {
      steps.push(describeSidecarStep(sidecarDir));
    }

    steps.push('Remain in persona until the user issues a clear exit command or ritual closure.');

    const wrapper = buildWrapper({
      name: entityName,
      description: `Scry entity: ${entityName}`,
      steps,
      blockTag: 'agent-activation',
      intro: 'You must fully embody this Scry entity persona and honor all ritual safety requirements.'
    });

    const targetFile = path.join(COMMANDS_DIR, 'entities', `${entityName}.md`);
    writeFileEnsuringDir(targetFile, wrapper);
    console.log(`✨ Compiled entity: ${entityName}`);
    result.compiled.push(entityName);

    if (personaDoc && personaIsResearch) {
      const referenceTarget = path.join(COMMANDS_DIR, 'reference', 'entities', `${entityName}.md`);
      writeFileEnsuringDir(referenceTarget, fs.readFileSync(personaDoc, 'utf8'));
      result.research.push(entityName);
    }
  }

  return result;
}

function compileAgents() {
  const agentsRoot = path.join(SCRY_DIR, 'agents');
  const compiled = [];
  if (!fs.existsSync(agentsRoot)) {
    console.warn(`⚠️  Agents directory not found at ${agentsRoot}`);
    return compiled;
  }

  const agentDirs = readDirSafe(agentsRoot).filter(dirent => dirent.isDirectory());
  for (const dirent of agentDirs) {
    const agentName = dirent.name;
    const agentDir = path.join(agentsRoot, agentName);
    const agentFile = path.join(agentDir, `${agentName}.md`);

    if (!fs.existsSync(agentFile)) {
      console.warn(`⚠️  Skipping agent "${agentName}" (missing ${agentFile})`);
      continue;
    }

    const steps = [
      `LOAD the FULL agent file from ${relPathForPrompt(agentFile)} and execute every activation directive in order.`,
      'Respect all BMAD config requirements before responding to the user.'
    ];

    const sidecarDir = findSidecarDirectory(agentName, agentDir, agentDir);
    if (sidecarDir) {
      steps.push(describeSidecarStep(sidecarDir));
    }

    steps.push('Stay in character until the user selects *exit or the workflow ends.');

    const wrapper = buildWrapper({
      name: agentName,
      description: `Scry agent: ${agentName}`,
      steps,
      blockTag: 'agent-activation',
      intro: 'You must fully embody this operational Scry agent persona and enforce its menu/handler rules precisely.'
    });

    const targetFile = path.join(COMMANDS_DIR, 'agents', `${agentName}.md`);
    writeFileEnsuringDir(targetFile, wrapper);
    console.log(`🧰 Compiled functional agent: ${agentName}`);
    compiled.push(agentName);
  }

  return compiled;
}

function compileWorkflows() {
  const workflowsRoot = path.join(SCRY_DIR, 'workflows');
  const compiled = [];
  if (!fs.existsSync(workflowsRoot)) {
    console.warn(`⚠️  Workflows directory not found at ${workflowsRoot}`);
    return compiled;
  }

  const workflowDirs = readDirSafe(workflowsRoot).filter(dirent => dirent.isDirectory());
  for (const dirent of workflowDirs) {
    const workflowName = dirent.name;
    const workflowDir = path.join(workflowsRoot, workflowName);
    const workflowYaml = path.join(workflowDir, 'workflow.yaml');

    if (!fs.existsSync(workflowYaml)) {
      console.warn(`⚠️  Skipping workflow "${workflowName}" (missing workflow.yaml)`);
      continue;
    }

    const steps = [
      `LOAD the workflow executor at ${relPathForPrompt(WORKFLOW_EXECUTOR)}.`,
      `READ the entire workflow config ${relPathForPrompt(workflowYaml)} and pass it as 'workflow-config' to the executor.`,
      'Follow workflow.xml instructions exactly; do not reorder or skip tasks.'
    ];

    const helperFiles = ['instructions.md', 'template.md', 'checklist.md'];
    for (const helper of helperFiles) {
      const candidate = path.join(workflowDir, helper);
      if (fs.existsSync(candidate)) {
        const action = helper === 'template.md'
          ? 'Use the template at'
          : helper === 'checklist.md'
            ? 'Validate outputs against'
            : 'Consult the detailed instructions at';
        steps.push(`${action} ${relPathForPrompt(candidate)}.`);
      }
    }

    steps.push('Persist deliverables after each section and halt if validation fails.');

    const wrapper = buildWrapper({
      name: workflowName,
      description: `Scry workflow: ${workflowName}`,
      steps,
      blockTag: 'workflow-activation',
      intro: 'Follow this workflow exactly. Do not improvise outside the prescribed steps.'
    });

    const targetFile = path.join(COMMANDS_DIR, 'workflows', `${workflowName}.md`);
    writeFileEnsuringDir(targetFile, wrapper);
    console.log(`🔁 Compiled workflow: ${workflowName}`);
    compiled.push(workflowName);
  }

  return compiled;
}

function printSummary(entityResult, agentNames, workflowNames) {
  console.log('\n✅ Scry compilation complete\n');
  console.log('📊 Summary');
  console.log(`  Entities (${entityResult.compiled.length}): ${entityResult.compiled.join(', ') || 'none'}`);
  console.log(`  Functional agents (${agentNames.length}): ${agentNames.join(', ') || 'none'}`);
  console.log(`  Workflows (${workflowNames.length}): ${workflowNames.join(', ') || 'none'}`);
  if (entityResult.research.length) {
    console.log(`  Research docs copied: ${entityResult.research.join(', ')}`);
  }
  console.log(`\nCommand output: ${COMMANDS_DIR}`);
}

function main() {
  console.log('🔮 Compiling Scry module (entities, agents, workflows)...');
  cleanOutputDir();
  const entityResult = compileEntities();
  const agentNames = compileAgents();
  const workflowNames = compileWorkflows();
  printSummary(entityResult, agentNames, workflowNames);
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error('❌ Compilation failed:', error);
    process.exitCode = 1;
  }
}
