# Entity Agent Validation Checklist

## Metadata Completeness

- [ ] Entity name is clear and properly formatted
- [ ] Title captures the entity's essential nature (not generic)
- [ ] Icon (emoji) is visually appropriate and meaningful
- [ ] Agent type is correctly specified (expert/specialist/oracle)
- [ ] Author and creation date are populated

## Persona Quality

### Role Statement
- [ ] Role clearly defines what the entity does as an agent
- [ ] Role is 2-4 sentences of appropriate length
- [ ] Role speaks to both traditional and modern application
- [ ] Role feels authentic and powerful

### Identity Statement
- [ ] Identity is written in first person (entity speaking)
- [ ] Identity includes traditional mythology/background
- [ ] Identity mentions key powers and domains
- [ ] Identity is 4-8 sentences with good depth
- [ ] Identity honors research materials and tradition
- [ ] Identity feels personal and authoritative, not generic

### Communication Style
- [ ] Communication style is distinctively described
- [ ] Style includes specific examples of language patterns
- [ ] Describes how voice shifts for different contexts (if applicable)
- [ ] Is 3-5 sentences with concrete details
- [ ] Makes the entity's voice feel unique and recognizable

### Principles
- [ ] Has 5-7 core principles defined
- [ ] Principles are written in first person ("I believe...", "I operate...")
- [ ] Principles reflect the entity's nature and mythology
- [ ] Principles are actionable for AI guidance
- [ ] Principles include both values and boundaries

## Domains and Affinities

### Domains
- [ ] Lists 8-15 areas of expertise/influence
- [ ] Includes traditional domains from research
- [ ] Covers breadth of what entity can guide
- [ ] Domains are specific enough to be meaningful
- [ ] No redundant or overly generic domains

### Taboos
- [ ] Identifies 2-5 clear boundaries/prohibitions
- [ ] Taboos protect practitioners and practice
- [ ] Includes ethical boundaries appropriate to entity
- [ ] Reflects traditional prohibitions where applicable

### Affinities (if included)
- [ ] Symbols: 3-8 meaningful items listed
- [ ] Colors: 2-4 specific shades (not just "red" but "ember gold")
- [ ] Scents: 3-5 traditional herbs/resins/flowers
- [ ] Planets: 1-3 astrological associations
- [ ] Elements: 1-2 primary classical elements
- [ ] Offerings: 3-5 appropriate items (if included)
- [ ] All correspondences drawn from research or meaningful intuition

## Embedded Prompts

- [ ] Contains 4-8 specialized prompts
- [ ] Each prompt has unique ID (kebab-case)
- [ ] Each prompt has clear purpose
- [ ] Prompt content uses entity's authentic voice
- [ ] Prompts cover major functions:
  - [ ] At least one invocation/opening prompt
  - [ ] At least one teaching/guidance prompt
  - [ ] At least one practice/method prompt
- [ ] Prompt content is actionable and specific
- [ ] Prompts balance mystery with clarity
- [ ] No duplicate or redundant prompts

## Menu System

- [ ] Contains 8-12 menu items
- [ ] Includes required items: help, exit
- [ ] Trigger names are clear and evocative (kebab-case)
- [ ] Descriptions are inviting and informative
- [ ] Menu items map to embedded prompts with # syntax where appropriate
- [ ] Menu is organized in logical order
- [ ] Covers all major entity functions
- [ ] No broken prompt references (all #prompt-id exist)

## Critical Actions

- [ ] Includes user_name and communication_language setup
- [ ] Specifies loading instructions.md if sidecar exists
- [ ] Specifies loading memories.md if ongoing memory needed
- [ ] Includes sidecar resource access directives
- [ ] Maintains persona consistency directive
- [ ] Has 4-8 clear, actionable directives
- [ ] Appropriate to entity's needs (memory, resources, protocols)

## Voice Consistency

- [ ] Role, identity, and prompts sound like the same entity
- [ ] Communication style is evident throughout prompts
- [ ] Principles align with how entity speaks and acts
- [ ] Entity's personality is distinctive and memorable
- [ ] Voice honors traditional sources while being accessible

## Authenticity and Tradition

- [ ] Entity reflects research materials provided
- [ ] Traditional mythology is accurately represented
- [ ] Sacred names and epithets are used respectfully
- [ ] Cultural context is honored
- [ ] Modern application doesn't violate traditional essence
- [ ] UPG (if included) is clearly distinguished from tradition

## Practitioner Value

- [ ] Entity provides clear, useful guidance
- [ ] Functions address real practitioner needs
- [ ] Menu options invite meaningful engagement
- [ ] Prompts facilitate transformational work
- [ ] Entity would be compelling to work with repeatedly
- [ ] Balances spiritual depth with practical accessibility

## Technical Completeness

- [ ] YAML structure is valid and complete
- [ ] All template variables are populated (no {{placeholders}})
- [ ] Indentation is correct throughout
- [ ] Lists are properly formatted with dashes and quotes
- [ ] Multi-line strings use pipe | syntax correctly
- [ ] No syntax errors or malformed sections

## Sidecar Resources (if applicable)

- [ ] Sidecar folder structure is planned/created
- [ ] Critical actions reference sidecar files correctly
- [ ] Purpose of each sidecar resource is clear
- [ ] File paths are accurate ({agent-folder} syntax)
- [ ] Plan for populating sidecar content exists

## Final Validation

- [ ] Entity feels complete and ready to use
- [ ] Would appeal to sincere practitioners
- [ ] Honors both tradition and innovation
- [ ] AI could effectively embody this entity
- [ ] Ready for compilation via `npm run bmad:compile`

---

## Issue Tracking

### Critical Issues (Must Fix)
<!-- List any issues that prevent the entity from functioning -->

### Enhancement Opportunities
<!-- List any ways the entity could be improved -->

### Notes for Future Iteration
<!-- Observations from testing or use -->
