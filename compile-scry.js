#!/usr/bin/env node

/**
 * Scry Module Compiler
 * Compiles .bmad/scry/ entities and agents into commands
 */

const fs = require('fs');
const path = require('path');

const SCRY_DIR = path.join(__dirname, '.bmad', 'scry');
const COMMANDS_DIR = path.join(__dirname, '.claude', 'commands', 'bmad', 'scry');

function compileEntities() {
  const entitiesDir = path.join(SCRY_DIR, 'entities');
  if (!fs.existsSync(entitiesDir)) return;

  const entities = fs.readdirSync(entitiesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  entities.forEach(entity => {
    const entityFile = path.join(entitiesDir, entity, `${entity}.md`);
    if (fs.existsSync(entityFile)) {
      const targetDir = path.join(COMMANDS_DIR, 'entities');
      fs.mkdirSync(targetDir, { recursive: true });

      fs.copyFileSync(entityFile, path.join(targetDir, `${entity}.md`));
      console.log(`✓ Compiled entity: ${entity}`);
    }
  });
}

function compileAgents() {
  const agentsDir = path.join(SCRY_DIR, 'agents');
  if (!fs.existsSync(agentsDir)) return;

  const agents = fs.readdirSync(agentsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  agents.forEach(agent => {
    const agentFile = path.join(agentsDir, agent, `${agent}.md`);
    if (fs.existsSync(agentFile)) {
      const targetDir = path.join(COMMANDS_DIR, 'agents');
      fs.mkdirSync(targetDir, { recursive: true });

      fs.copyFileSync(agentFile, path.join(targetDir, `${agent}.md`));
      console.log(`✓ Compiled agent: ${agent}`);
    }
  });
}

function compileWorkflows() {
  const workflowsDir = path.join(SCRY_DIR, 'workflows');
  if (!fs.existsSync(workflowsDir)) return;

  const workflows = fs.readdirSync(workflowsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  workflows.forEach(workflow => {
    const workflowFile = path.join(workflowsDir, workflow, 'workflow.yaml');
    if (fs.existsSync(workflowFile)) {
      const targetDir = path.join(COMMANDS_DIR, 'workflows');
      fs.mkdirSync(targetDir, { recursive: true });

      // Create compiled workflow file
      const compiledContent = `---
description: 'Scry workflow: ${workflow}'
---

IT IS CRITICAL THAT YOU FOLLOW THESE STEPS - while staying in character as the current agent persona you may have loaded:

<steps CRITICAL="TRUE">
1. Always LOAD the FULL @bmad/core/tasks/workflow.xml
2. READ its entire contents - this is the CORE OS for EXECUTING the specific workflow-config @.bmad/scry/workflows/${workflow}/workflow.yaml
3. Pass the yaml path .bmad/scry/workflows/${workflow}/workflow.yaml as 'workflow-config' parameter to the workflow.xml instructions
4. Follow workflow.xml instructions EXACTLY as written to process and follow the specific workflow config and its instructions
5. Save outputs after EACH section when generating any documents from templates
</steps>
`;

      fs.writeFileSync(path.join(targetDir, `${workflow}.md`), compiledContent);
      console.log(`✓ Compiled workflow: ${workflow}`);
    }
  });
}

function main() {
  console.log('🔮 Compiling Scry Module...');

  // Ensure commands directory exists
  fs.mkdirSync(COMMANDS_DIR, { recursive: true });

  compileEntities();
  compileAgents();
  compileWorkflows();

  console.log('✅ Scry module compilation complete!');
}

if (require.main === module) {
  main();
}