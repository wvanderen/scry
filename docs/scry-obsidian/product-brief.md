# Product Brief: Scry Obsidian Integration

**Date:** 2025-11-10
**Author:** Lem
**Context:** Personal Practice Enhancement

---

## Executive Summary

Scry Obsidian Integration transforms the existing Scry BMAD module from a repository-based ritual tool into a seamless Obsidian vault experience, creating the "ultimate digital book of shadows" that makes ritual connections explicit, visual, and human-readable. By leveraging Obsidian's "Good Parts" (Properties, Links, Tags) and applying the video's insights about portable markdown and named relationships, this integration will bridge the gap between structured ritual data and intuitive practice workflow, enabling practitioners to see and navigate the connections between practices, entities, correspondences, and insights that currently remain hidden in the database structure.

---

## Core Vision

### Problem Statement

Currently, the Scry BMAD module stores rich ritual data, entity knowledge, and practice insights in a structured repository format that requires conscious effort to access during ritual practice. Practitioners face the "database vs. practice" friction - they must either read from the repo (breaking ritual flow) or rely on memory, missing the opportunity to leverage the accumulated wisdom and connections. The relationships between rituals, entities, astrological timing, and personal insights remain implicit rather than visible and explorable.

### Why Existing Solutions Fall Short

Obsidian already excels at knowledge visualization and connection mapping, but lacks the structured ritual and esoteric data that Scry provides. Conversely, Scry has the depth of esoteric knowledge but lacks the intuitive visual interface that makes connections obvious during practice. Standard note-taking apps don't understand ritual structure, entity relationships, or correspondence systems, forcing practitioners to choose between authentic practice and structured knowledge management.

### Proposed Solution

Create a seamless bi-directional sync between Scry BMAD and Obsidian that:

1. **Exports Scry data as Obsidian-optimized markdown** using Properties for structured metadata, named links for explicit relationships, and hierarchical tags for categorization
2. **Maintains the "Good Parts" philosophy** - all data remains human-readable markdown that works even without Obsidian
3. **Makes connections explicit** through named links like `requires:: [[LBRP]]`, `entity:: [[Hekate]]`, `correspondence:: [[Venus]]`
4. **Syncs practice insights** back from Obsidian to Scry's database, maintaining the knowledge evolution
5. **Provides Obsidian-specific views** that leverage graph visualization, canvas, and query features for ritual discovery

### Key Differentiators

- **First implementation** applying Obsidian "Good Parts" methodology to esoteric practice data
- **Bi-directional sync** maintains both structured database and visual exploration capabilities
- **Named relationship system** makes ritual connections explicit rather than implicit
- **Human-readable fallback** ensures practice continuity even without technology
- **Entity-aware linking** understands esoteric relationships (planetary correspondences, entity hierarchies, ritual prerequisites)

---

## Target Users

### Primary Users

**Serious Esoteric Practitioners** who already use both Scry BMAD and Obsidian separately, experiencing the friction of switching between repository access and visual knowledge management. These practitioners value authentic practice but want to leverage their accumulated wisdom without breaking ritual flow. They're tech-savvy, understand both markdown and esoteric systems, and want to see patterns in their practice evolution.

### Secondary Users

**Practice Documentarians** who focus on building comprehensive personal grimoires and want to ensure their knowledge remains accessible and connected. They prioritize long-term knowledge preservation and discovery over immediate ritual utility.

---

## Success Metrics

### Key Performance Indicators

- **Reduction in ritual lookup time**: From manually searching repo to clicking visual links in Obsidian
- **Discovery of hidden connections**: Users finding unexpected relationships through graph visualization
- **Practice integration frequency**: Number of times users reference Obsidian during active ritual work
- **Knowledge capture rate**: Increase in logged practice insights due to easier capture methods

---

## MVP Scope

### Core Features

**1. Scry-to-Obsidian Export Engine**
- Export rituals as individual markdown files with Properties for metadata (timing, prerequisites, difficulty)
- Export entity profiles with correspondence Properties and hierarchical relationships
- Create automatic named links between related items (`based_on:: [[Ritual]]`, `entity:: [[Hekate]]`)
- Generate hierarchical tag structure following PARA methodology: #scry/ritual, #scry/entity, #scry/correspondence

**2. Obsidian Vault Structure**
- Ritual library with searchable Properties (duration, difficulty, planetary influences)
- Entity grimoire with correspondence Properties and relationship links
- Practice journal template with automatic timestamp and astrological context
- Index pages leveraging Obsidian's query capabilities for dynamic content
- **Standardized Relationship Schema**: ritual_type::, prerequisite::, correspondence::, entity::, timing::
- **Hierarchical Tag System**: #scry/ritual/planetary/venus, #scry/entity/chthonian/hekate, #scry/insight/dream-message
- **Tag Analytics Dashboard**: Periodic review of tag distribution to identify practice themes

**3. Bi-directional Sync Foundation**
- Basic import of practice notes from Obsidian back to Scry database
- Conflict resolution for duplicate or conflicting information
- Preservation of Scry's structured data while enabling Obsidian's visual exploration
- **Markdown Hijacker Integration**: Real-time file-level sync between Scry export directory and Obsidian vault
- **Version Control Strategy**: Property-based versioning (version:: 1.2) with timestamp-based conflict resolution
- **Offline Practice Support**: Local vault editing with sync reconciliation when connectivity restored

**4. Batteries-Included Journal Templates**
- Context-aware templates triggered from any ritual, entity, or correspondence note
- Automatic timestamp formatting and Properties population based on current note context
- **Ritual Completion Template**: captures duration, practitioner state, astrological conditions, insights
- **Entity Conversation Template**: structures dialogue summaries and key guidance with relationship tracking
- **Universal Insight Capture Template**: cross-context practice insights with automatic relationship linking
- **Templater Integration**: Advanced template triggers with dynamic content population and user prompts
- **Calendar Integration**: Automatic time anchors for ritual logs creating chronological practice tracking
- One-click insertion that feels like natural practice continuation rather than data entry

**5. Dynamic Ritual Dashboard System**
- **Dataview Queries**: Automatically generate relevant ritual lists based on timing, difficulty, entities
- **Interactive Bases**: Filter rituals by planet, difficulty level, or entity relationships
- **Contextual Ritual Recommendations**: Dynamic suggestions based on current astrological conditions
- **Practice Pattern Analytics**: Visual representations of ritual frequency and effectiveness over time

**6. Advanced Connection Visualization**
- **ExcaliBrain Integration**: Semantic relationship visualization showing ritual dependencies and entity hierarchies
- **Canvas Planning Boards**: Drag-and-drop ritual design with visual energy flow mapping
- **Graph View Optimization**: Property-based node coloring and focused sub-network exploration
- Named relationship system making ritual dependencies explicit
- Quick filters for ritual timing, entity relationships, correspondence types
- Journal insights automatically linked to source rituals/entities for pattern discovery

### Out of Scope for MVP

- Real-time synchronization (batch sync on demand is sufficient)
- Complex ritual builders or automated ritual generation
- Mobile-specific features or Obsidian plugin development
- Multi-user collaboration or sharing capabilities
- Advanced AI-powered insight discovery within Obsidian

### Future Vision

Advanced Obsidian plugin that provides ritual timing prompts, automatic correspondence lookup, and practice pattern analysis leveraging the structured data foundation established in MVP. Enhanced template system with practice-specific prompts, automated insight suggestions, and advanced relationship discovery based on accumulated journal data.

---

## Market Context

This project sits at the intersection of the growing personal knowledge management (PKM) renaissance and the increasing acceptance of digital tools in spiritual practice. Obsidian's user base consists of sophisticated users who value data ownership and visual thinking - perfect alignment with serious esoteric practitioners. The "Good Parts" philosophy from the video ensures this implementation avoids common PKM pitfalls while creating lasting value.

---

## Technical Preferences

**Platform**: Obsidian-first with markdown-first design ensuring portability
**Data Source**: Existing Scry BMAD database structure
**Sync Strategy**: File-based rather than API-based to ensure reliability and transparency
**Markup Language**: Standard Obsidian markdown with Properties frontmatter
**Relationship System**: Named links following the video's recommended patterns
**Tag Hierarchy**: Hierarchical tags for organization (#scry/ritual/planetary)

---

## Organizational Context

This is a personal enhancement project that directly improves Lem's daily practice while creating a reusable template for the broader Scry community. It bridges the gap between the Enterprise version's sophisticated backend and the personal need for intuitive, visual practice management.

---

## Risks and Assumptions

**Key Assumptions**:
- Obsidian users prefer markdown-first solutions over proprietary plugins
- Named relationships provide more value than generic linking
- Practitioners will switch between tools if the value proposition is strong enough
- The structured data in Scry can be effectively represented in markdown Properties

**Key Risks**:
- **Sync complexity**: Maintaining consistency between two systems could become brittle
- **Over-engineering**: The temptation to create complex automation when simple export may suffice
- **User adoption**: The friction of learning a new workflow might outweigh benefits

---

## Timeline

**Phase 1 (2 weeks)**: Export engine, vault structure, and relationship schema
**Phase 2 (1 week)**: Bi-directional sync with Markdown Hijacker integration
**Phase 3 (1 week)**: Templater templates and basic Dataview dashboard
**Phase 4 (1 week)**: ExcaliBrain visualization and Canvas planning boards
**Testing**: 1 week of real-world practice validation with complete workflow testing

**Plugin-Specific Implementation Details:**
- **Week 1-2**: Core export engine + standardized relationship types
- **Week 3**: Markdown Hijacker setup + version control strategy
- **Week 4**: Templater template triggers + Calendar integration
- **Week 5**: Dataview queries + basic dashboard building
- **Week 6**: ExcaliBrain configuration + Canvas ritual planning boards

---

## Supporting Materials

**Input Documents Referenced**:
- "Obsidian The Good Parts" transcript - provided philosophical foundation for Properties, Links, Tags approach
- Existing Scry (Enterprise) Product Brief - informed understanding of current capabilities and distinction from BMAD version
- Current Scry BMAD module structure - understanding existing ritual and entity data organization
- **Obsidian Ecosystem Research**: Deep dive into ExcaliBrain, Dataview, Templater, Canvas, and Markdown Hijacker plugins
- **Implementation Roadmap Analysis**: Plugin-specific capabilities and integration strategies

**Key Plugin Integrations Identified**:
- **ExcaliBrain**: Semantic relationship visualization for ritual dependencies and entity hierarchies
- **Dataview & Bases**: Dynamic ritual dashboards with filtering by planetary, entity, and difficulty dimensions
- **Templater**: Advanced template triggers with dynamic content population and user prompts
- **Canvas**: Visual ritual planning boards with drag-and-drop relationship mapping
- **Markdown Hijacker**: Real-time bi-directional sync with offline practice support
- **Calendar**: Time anchors for ritual logs creating chronological practice tracking

**Expected Tangible Benefits**:
- 70% improvement in logging efficiency through auto-populated templates
- Clear ritual dependency visualization reducing cognitive load
- Dynamic ritual recommendations replacing manual filtering
- Visual ritual design supporting non-linear creative exploration
- Offline practice capability with automatic sync reconciliation

---

## Strategic Revision Summary

**Date**: November 10, 2025
**Context**: Application of Obsidian "Good Parts" methodology to esoteric practice data
**Key Insight**: The video's emphasis on named relationships and portable markdown provides the perfect framework for making ritual connections explicit and human-readable

---

_This Product Brief captures the vision for transforming Scry BMAD into a seamlessly integrated Obsidian vault experience that honors authentic practice while leveraging the power of visual knowledge management._

_Next: Use the PRD workflow to create detailed product requirements from this brief, focusing on the technical implementation of the export engine and sync system._