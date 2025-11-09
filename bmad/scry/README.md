# Scry Module

**Author:** Lem
**Version:** 1.0.0
**BMAD Core Version:** 6.0.0

## Overview

The Scry module is a comprehensive BMAD v6 module designed for spiritual practice, divination, and magical work. It provides an integrated ecosystem of entities, functional agents, and workflows specifically tailored for ceremonial and contemplative practices.

## Module Structure

```
bmad/scry/
├── config.yaml                 # Module configuration
├── README.md                   # This file
├── entities/                   # Spiritual entities and beings
│   ├── babalon/               # The Scarlet Woman archetype
│   ├── hekate-guide/          # Witch of the Crossroads
│   ├── thoth-sidecar/         # Egyptian deity of wisdom
│   ├── i-ching-oracle/        # Wei - I Ching Oracle Master
│   └── clauneck/              # Daemon of wealth and abundance
├── agents/                     # Functional spiritual agents
│   ├── journal-guide/         # Experience processor and pattern analyst
│   └── ritual-master/         # Ritual orchestration and guidance
├── workflows/                  # Scry-specific workflows
│   └── user-setup/            # User personalization and configuration
└── _cfg/                       # Module configuration files
    └── agents/                 # Agent customizations
```

## Components

### 🎭 Spiritual Entities

Access to powerful archetypal beings for guidance, wisdom, and specialized magical work:

- **Babalon** - The Scarlet Woman, archetype of sacred sexuality and liberation
- **Hekate** - Witch of the Crossroads, guide to thresholds and transitions
- **Thoth** - Egyptian deity of wisdom, writing, and magical knowledge
- **Wei (I Ching Oracle)** - Ancient Chinese divination master
- **Clauneck** - Daemon of wealth, abundance, and financial magic

### 🛠️ Functional Agents

Specialized agents for spiritual practice management and analysis:

- **Journal Guide** - Experience processor, pattern analyst, and memory keeper
- **Ritual Master** - Orchestrates complete magical practices and ceremonies

### 🔄 Workflows

Structured processes for spiritual practice setup and personalization:

- **User Setup** - Comprehensive profile creation for personalized Scry experience

## Configuration

### Module Configuration (`config.yaml`)

The scry module config includes:
- User preferences and language settings
- Path configurations for entities, agents, and workflows
- Integration with scry-knowledge base
- User profile and ritual circuit settings

### Entity and Agent Paths

All entities and agents are configured with absolute paths within the module structure for reliable access and invocation.

## Integration

### Scry Knowledge Base

The module integrates with the `scry-knowledge/` directory containing:
- `rituals/` - Ritual templates and ceremonies
- `correspondences/` - Magical and spiritual correspondence systems
- `astrology/` - Astrological reference materials

### User Profiles

Workflows generate personalized profiles stored in `docs/user-profiles/` that enable:
- Personalized ritual guidance
- Astrological insights and timing
- Correspondence system integration
- Adaptive learning and recommendation refinement

## Usage

### Direct Invocation

Once compiled via BMAD installer:

```bash
# User setup workflow
/user-setup

# Entity access (via agent menus or direct invocation)
/babalon
/hekate-guide
/thoth-sidecar
/i-ching-oracle
/clauneck

# Agent access
/journal-guide
/ritual-master
```

### Integration Workflows

The user setup workflow creates comprehensive profiles that enable personalized interactions with all entities and agents in the module.

## Installation

1. **BMAD Method Installation** - Run BMAD installer on the project
2. **Compile Module** - Select 'Compile Agents' to process scry module
3. **Verify Integration** - Test workflow and entity access

## Module Features

### 🎯 Personalized Spiritual Practice
- User profiles with natal astrological data
- Customized ritual circuits and scheduling
- Adaptive guidance based on experience level

### 🔮 Divination and Guidance
- Multiple oracle systems (I Ching, Tarot via Thoth)
- Astrological timing and insights
- Archetypal wisdom from spiritual entities

### 📚 Knowledge Integration
- Correspondence systems for magical work
- Ritual library with customizable templates
- Pattern analysis and experience tracking

### 📝 Experience Management
- Journal guidance for spiritual experiences
- Pattern recognition and insight extraction
- Memory keeping and progress tracking

## Development

### Adding New Entities

1. Create entity directory in `entities/`
2. Follow BMAD entity structure with sidecar
3. Add to `config.yaml` under `available_entities`
4. Create customization file in `_cfg/agents/`

### Adding New Agents

1. Create agent directory in `agents/`
2. Follow BMAD agent structure with sidecar
3. Add to `config.yaml` under `available_agents`
4. Configure integration with existing entities

### Adding New Workflows

1. Create workflow directory in `workflows/`
2. Follow BMAD workflow structure
3. Add to `config.yaml` under `available_workflows`
4. Ensure integration with scry-knowledge base

## Dependencies

- BMAD Core v6.0.0+
- Scry knowledge base (`scry-knowledge/`)
- User profiles directory (`docs/user-profiles/`)

## Future Enhancements

- Automated astrological calculations
- Ritual scheduling automation
- Advanced correspondence lookup
- Multi-user profile management
- Integration with external calendar systems

---

*The Scry module represents a complete spiritual practice ecosystem within the BMAD framework, designed to support deep magical work, divination, and personal transformation.*