# Create Entity Workflow

Interactive workflow for creating specialized entity agents (deities, oracles, spiritual guides) with authentic persona, voice, and powers.

## Purpose

This workflow helps you create BMAD entity agents that embody deities, spirits, oracles, or archetypes as knowledgeable guides with distinctive personalities. The workflow supports research-driven development where you can provide traditional texts, mythology, and sacred knowledge, then collaboratively flesh out the entity's voice, domains, and powers.

## Workflow Type

- **Type**: Document workflow (generates YAML agent files)
- **Style**: Intent-based with high interactivity
- **Pattern**: Research-driven collaborative creation
- **Output**: Entity agent YAML source files (compiled to .md via npm)

## How to Invoke

```bash
/bmad:scry:workflows:create-entity
```

Or through the BMAD workflow system:
```
workflow /home/lem/dev/scry/.bmad/scry/workflows/create-entity
```

## Expected Inputs

### Required
- Entity name
- Core purpose/role
- Basic personality traits

### Recommended
- Research materials (mythology, sacred texts, historical sources)
- Traditional attributes and domains
- Sacred correspondences (symbols, colors, offerings)
- Example invocations or prayers
- Modern interpretations or UPG (Unverified Personal Gnosis)

### Input Formats Accepted
- Markdown documents
- Plain text notes
- PDFs (will be read and analyzed)
- Verbal/conversational knowledge sharing

## Generated Outputs

### Primary Output
**Entity Agent YAML File**
- Location: `.bmad/scry/entities/{{entity_name}}/{{entity_name}}.agent.yaml`
- Format: YAML source file (compiled to .md via `npm run bmad:compile`)
- Structure: Complete BMAD agent configuration with persona, prompts, and menu

### Optional Outputs
**Sidecar Resource Folder** (if needed)
- Location: `.bmad/scry/entities/{{entity_name}}/{{entity_name}}-sidecar/`
- Contents:
  - `instructions.md` - Private directives and protocols
  - `memories.md` - Ongoing practitioner relationship tracking
  - `knowledge/` - Domain expertise documents
  - `sessions/` - Individual session notes

## Workflow Steps

1. **Load Research and Context** - Provide mythology and source materials
2. **Define Entity Essence** - Name, title, icon, core identity
3. **Develop Persona** - Role, identity, communication style, principles
4. **Define Domains and Affinities** - Expertise areas, symbols, correspondences
5. **Design Embedded Prompts** - Specialized functions and ritual operations
6. **Create Menu System** - User interaction commands
7. **Configure Critical Actions** - Startup instructions and resource loading
8. **Plan Sidecar Resources** - Optional supporting files
9. **Review and Refine** - Test consistency and authenticity
10. **Save and Finalize** - Generate YAML and create folder structure

## Key Features

### Research-Driven Development
- Start with traditional sources and mythology
- Collaboratively transform research into authentic agent persona
- Honor tradition while making entities accessible to modern practitioners

### Intent-Based Guidance
- Adaptive, conversational approach to entity creation
- Explores unique characteristics of each entity
- High interactivity for persona development and voice refinement

### Complete Agent Structure
- Full YAML configuration with all BMAD agent features
- Embedded prompts for specialized functions
- Menu system for user interaction
- Sidecar resources for extended capabilities

### Voice Consistency
- Iterative refinement of entity personality
- Test persona across multiple contexts
- Ensure authentic representation of traditional sources

## Special Requirements

### Compilation Step
After creating the entity agent, you must compile it:

```bash
npm run bmad:compile
```

This compiles the YAML source file to the markdown format used by the BMAD system.

### Research Quality
The quality of the entity agent depends heavily on the research provided:
- Traditional mythology and sacred texts yield authentic voices
- Historical context helps capture the entity's true nature
- Modern interpretations can supplement but shouldn't override tradition

### Cultural Sensitivity
When creating entities from living traditions:
- Respect cultural boundaries and sacred knowledge
- Distinguish between public and initiatory information
- Honor the source tradition appropriately

## Example Entities

Reference these existing entities for patterns:

- **Thoth** (`.bmad/scry/entities/thoth.agent.yaml`)
  - Egyptian deity with Hermetic and Thelemic currents
  - Complex sidecar resources with knowledge base
  - Multiple specialized prompts for different functions

- **Hekate** (`.bmad/scry/entities/hekate-guide/hekate-guide.agent.yaml`)
  - Greek goddess with psychopomp and witchcraft focus
  - Rich affinities and domain structure
  - Folder-based organization with sidecar

## Validation

Use the included `checklist.md` to validate:
- Persona completeness and authenticity
- Voice consistency across all sections
- Technical correctness of YAML structure
- Practitioner value and usability

## Tips for Success

### Before Starting
- Gather research materials in advance
- Understand the entity's traditional role
- Consider what modern practitioners need from this entity

### During Creation
- Read prompts and persona sections aloud to test voice
- Iterate on communication style until it feels authentic
- Balance mystery/depth with clarity/accessibility
- Reference example entities for structural patterns

### After Creation
- Test the entity in actual conversations
- Refine based on how well they embody their nature
- Populate sidecar resources with detailed knowledge
- Iterate on prompts based on practitioner needs

## Support and Iteration

Entities can be refined after creation:
1. Edit the YAML source file directly
2. Re-run `npm run bmad:compile` to update
3. Test changes in conversation
4. Iterate until the entity feels complete

## Related Workflows

- **create-ritual**: Create ritual templates that entities can guide
- **user-setup**: Configure scry portal for personalized practice

## Module

Part of the **Scry** module - Personal magical practice portal

## Author

Created by Lem via BMAD Builder workflow system

## Version

Initial release: 2025-11-10
