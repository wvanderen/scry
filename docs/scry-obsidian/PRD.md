# Scry Obsidian Integration - Product Requirements Document

**Author:** Lem
**Date:** 2025-11-10
**Version:** 1.0

---

## Executive Summary

Scry Obsidian Integration transforms the existing Scry BMAD module from a repository-based ritual tool into a seamless Obsidian vault experience, creating the "ultimate digital book of shadows" that makes ritual connections explicit, visual, and human-readable. By leveraging Obsidian's "Good Parts" (Properties, Links, Tags) and applying portable markdown principles with named relationships, this integration bridges the gap between structured ritual data and intuitive practice workflow.

The system enables practitioners to see and navigate the connections between practices, entities, correspondences, and insights that currently remain hidden in the repository structure, while maintaining the ability to work seamlessly across desktop (Claude Code agent mode) and mobile (Obsidian vault) environments.

### What Makes This Special

**The Mobile Ritual Magic**: The ability to follow ritual instructions and capture practice insights on your phone during active ritual work - no context switching, no breaking the sacred space, just seamless flow between reading ritual instructions, performing the practice, and journaling reflections. This is the core magic that transforms Scry from a knowledge repository into a living practice companion.

---

## Project Classification

**Technical Type:** Developer Tool (export/sync engine) + Desktop App (Obsidian integration)
**Domain:** General (Personal Knowledge Management with esoteric practice specialization)
**Complexity:** Medium

This project combines elements of a developer tool (the export and sync engine that transforms BMAD data structures into Obsidian-optimized markdown) with desktop application features (Obsidian plugin ecosystem integration). While the domain is specialized (esoteric practice), it doesn't involve regulatory compliance or safety-critical systems, keeping complexity at a manageable medium level.

**Current Technical Architecture:**
- Data storage: Markdown and YAML files in `.bmad/scry/` module
- Rituals: Structured MD in `scry-knowledge/rituals/` with sections, timing, correspondences
- Entities: agent.yaml files with sidecar folders (knowledge, sessions, memories)
- No database currently (postgres planned for future, but MVP uses existing file structure)
- Bi-directional workflow: Claude Code "agent mode" ↔ Obsidian "vault mode"

---

## Success Criteria

Success for this project is measured by the seamless integration of practice and knowledge management:

### Primary Success Indicators

1. **Mobile Ritual Practice Flow**: Practitioners can access full ritual instructions on mobile Obsidian, perform the ritual, and capture insights without switching apps or breaking sacred space
2. **Discovery of Hidden Connections**: Users find unexpected relationships through Obsidian's graph visualization (e.g., discovering that three different rituals all invoke the same entity, or seeing planetary correspondence patterns across practices)
3. **Reduction in Ritual Lookup Time**: From manually searching the repo to clicking visual links in Obsidian - target 70% time reduction
4. **Practice Integration Frequency**: Increase in logged practice insights due to easier capture methods (batteries-included templates that feel like natural continuation)

### User Experience Markers

- "I can see my entire practice landscape at a glance in the graph view"
- "Journaling feels like continuing the ritual, not doing data entry"
- "I discovered connections I never would have found in the repository"
- "I can practice anywhere with just my phone and the Obsidian vault"

### Technical Success Metrics

- Successful bi-directional sync between `.bmad/scry` and Obsidian vault
- All relationships (ritual → entity, ritual → correspondence, etc.) represented as named links
- Zero data loss during sync operations
- Offline practice capability with reconciliation when connectivity restored

---

## Product Scope

### MVP - Minimum Viable Product

**1. Scry-to-Obsidian Export Engine**
- Export rituals as individual markdown files with Properties for metadata (timing, prerequisites, difficulty, duration, planetary influences)
- Export entity profiles with correspondence Properties and hierarchical relationships
- Create automatic named links between related items:
  - `based_on:: [[Ritual]]` - ritual dependencies
  - `entity:: [[Hekate]]` - entity invocations
  - `correspondence:: [[Venus]]` - planetary/elemental associations
  - `prerequisite:: [[LBRP]]` - required prior practices
  - `timing:: [[Waxing Moon]]` - astrological context
- Generate hierarchical tag structure: `#scry/ritual/planetary/venus`, `#scry/entity/chthonian/hekate`, `#scry/insight/dream-message`

**2. Obsidian Vault Structure**
- Ritual library with searchable Properties (duration, difficulty, planetary influences)
- Entity grimoire with correspondence Properties and relationship links
- Practice journal template with automatic timestamp and astrological context
- Index pages leveraging Dataview queries for dynamic content
- Standardized folder structure mirroring `.bmad/scry` organization

**3. Bi-directional Sync Foundation**
- Markdown Hijacker integration for real-time file-level sync
- Basic import of practice notes from Obsidian back to Scry database
- Property-based versioning (`version:: 1.2`) with timestamp-based conflict resolution
- Preservation of Scry's structured data while enabling Obsidian's visual exploration
- Offline practice support with sync reconciliation when connectivity restored

**4. Batteries-Included Journal Templates (Templater)**
- **Ritual Completion Template**: Auto-populated from ritual note context
  - Captures: duration, practitioner state, astrological conditions, insights
  - Automatic timestamp formatting and Properties population
  - Creates backlinks to source ritual and entities
- **Entity Conversation Template**: Structures dialogue summaries
  - Relationship tracking to entity notes
  - Key guidance extraction
  - Context-aware prompts
- **Universal Insight Capture Template**: Cross-context insights
  - Automatic relationship linking
  - Tag suggestion based on context
  - One-click insertion that feels natural
- Calendar integration for automatic time anchors creating chronological practice tracking

**5. Dynamic Ritual Dashboard System (Dataview + Bases)**
- Automatically generated ritual lists based on:
  - Current astrological timing
  - Difficulty level
  - Entity relationships
  - Practice frequency
- Interactive filters: planet, difficulty, entity, correspondence type
- Contextual ritual recommendations based on astrological conditions
- Practice pattern analytics showing ritual frequency and effectiveness over time

**6. Advanced Connection Visualization**
- **ExcaliBrain Integration**: Semantic relationship visualization
  - Ritual dependency trees
  - Entity hierarchy maps
  - Correspondence network graphs
- **Canvas Planning Boards**: Visual ritual design
  - Drag-and-drop ritual sequencing
  - Energy flow mapping
  - Multi-day working visualization
- **Graph View Optimization**: Property-based node coloring
  - Rituals = one color, Entities = another, Insights = third
  - Quick filters for focused sub-network exploration
  - Named relationships make connections explicit in graph

### Out of Scope for MVP

- Real-time synchronization (batch sync on demand is sufficient)
- Complex ritual builders or automated ritual generation
- Native Obsidian plugin development (using existing plugin ecosystem)
- Multi-user collaboration or sharing capabilities
- Advanced AI-powered insight discovery within Obsidian
- Mobile-specific UI development (using standard Obsidian mobile)

### Future Vision (Post-MVP)

- Advanced Obsidian plugin providing ritual timing prompts
- Automatic correspondence lookup during ritual design
- Practice pattern analysis with AI-powered suggestions
- Enhanced template system with practice-specific prompts
- Automated insight suggestions based on accumulated journal data
- Advanced relationship discovery leveraging graph analysis
- Integration with actual astrological calculation APIs (not just manual entry)

---

## Developer Tool & Integration Specifications

### Export Engine Technical Architecture

The export engine is the core transformation layer that converts BMAD module data structures into Obsidian-optimized markdown files with proper Properties, named links, and hierarchical tags.

#### Data Transformation Rules

**From BMAD Ritual Files (.md, .yaml) to Obsidian Ritual Notes:**

Source: `.bmad/scry/scry-knowledge/rituals/*.{md,yaml}`
Destination: `vault/Rituals/*.md`

Transformation process:
1. **Parse source file** - Extract YAML frontmatter, markdown sections, and inline metadata
2. **Generate Properties** - Convert metadata to Obsidian Properties format:
   ```yaml
   ---
   ritual_type: banishing
   duration: 15min
   difficulty: intermediate
   entities: ["Therion", "Nuit", "Babalon", "Hadit"]
   correspondences: ["Mars", "Fire"]
   prerequisites: ["LBRP"]
   tradition: "Thelema"
   source: "Liber XXV"
   date_created: 2025-11-10
   version: 1.0
   ---
   ```
3. **Transform section headers** - Preserve markdown structure while adding navigational clarity
4. **Generate named links** - Scan content for entity names, ritual references, and correspondences, convert to wikilinks:
   - Entity mentions → `entity:: [[Hekate]]`
   - Ritual dependencies → `prerequisite:: [[LBRP]]`
   - Planetary references → `correspondence:: [[Venus]]`
5. **Apply tag hierarchy** - Based on ritual type and attributes:
   - `#scry/ritual/banishing` or `#scry/ritual/invocation`
   - `#scry/tradition/thelema` or `#scry/tradition/hermetic`
   - `#scry/planetary/mars` for planetary workings

**From BMAD Entity Files (.agent.yaml) to Obsidian Entity Profiles:**

Source: `.bmad/scry/entities/*/[entity].agent.yaml`
Destination: `vault/Entities/*.md`

Transformation process:
1. **Extract agent metadata** - Parse YAML structure for persona, domains, affinities
2. **Generate entity Properties**:
   ```yaml
   ---
   entity_type: deity
   domains: ["thresholds", "witchcraft", "psychopomp"]
   planets: ["Luna", "Saturn"]
   elements: ["Earth", "Fire"]
   colors: ["deep indigo", "ember gold", "black"]
   offerings: ["milk", "honey", "lavender"]
   correspondences: ["keys", "torches", "crossroads"]
   tradition: "Greek Magical Papyri"
   ---
   ```
3. **Convert persona to readable profile** - Transform agent instructions into grimoire-style entity description
4. **Link to associated rituals** - Scan all rituals that invoke this entity, create backlinks section
5. **Include knowledge base** - Incorporate sidecar knowledge files (mythos, practices)
6. **Apply entity tags**:
   - `#scry/entity/deity` or `#scry/entity/archetype`
   - `#scry/entity/chthonian` or `#scry/entity/celestial` (based on nature)
   - `#scry/tradition/greek` or `#scry/tradition/thelemic`

#### File Naming Conventions

- **Rituals**: `{ritual-name}.md` (kebab-case, e.g., `star-ruby-liber-xxv.md`)
- **Entities**: `{entity-name}.md` (kebab-case, e.g., `hekate-guide.md`)
- **Journal Entries**: `{YYYY-MM-DD}-{ritual-or-entity-name}.md` (e.g., `2025-11-10-star-ruby.md`)
- **Correspondences**: `{correspondence-name}.md` (e.g., `venus.md`, `waxing-moon.md`)

#### Link Generation Algorithm

```
For each content section:
  1. Scan for entity names from known entity list
  2. Scan for ritual names from ritual library
  3. Scan for correspondence keywords (planets, elements, lunar phases)
  4. For each match:
     - Create wikilink: [[Entity Name]]
     - Add named relationship if context appropriate:
       - "invokes [[Hekate]]" → entity:: [[Hekate]]
       - "requires LBRP" → prerequisite:: [[LBRP]]
       - "Venus hour" → correspondence:: [[Venus]]
  5. Preserve original text readability
```

#### Tag Generation Rules

Hierarchical tags follow PARA-inspired methodology:

**Ritual Tags:**
- Level 1: `#scry/ritual`
- Level 2: `#scry/ritual/{type}` where type = banishing, invocation, meditation, devotional
- Level 3: `#scry/ritual/{type}/{tradition}` where tradition = thelema, hermetic, greek, chaos

**Entity Tags:**
- Level 1: `#scry/entity`
- Level 2: `#scry/entity/{category}` where category = deity, archetype, spirit, angel
- Level 3: `#scry/entity/{category}/{nature}` where nature = chthonian, celestial, elemental

**Correspondence Tags:**
- Level 1: `#scry/correspondence`
- Level 2: `#scry/correspondence/{type}` where type = planetary, elemental, lunar, color, scent

**Journal Tags:**
- Level 1: `#scry/journal`
- Level 2: `#scry/journal/{type}` where type = ritual-log, entity-dialogue, insight, dream

### Obsidian Vault Architecture

#### Folder Structure

```
vault/
├── Rituals/
│   ├── Banishing/
│   │   ├── lbrp.md
│   │   ├── star-ruby.md
│   │   └── sphere-of-hekas.md
│   ├── Invocation/
│   │   ├── liber-samekh.md
│   │   └── middle-pillar.md
│   └── Devotional/
│       ├── hekate-daily-devotional.md
│       └── call-of-babalon.md
├── Entities/
│   ├── Deities/
│   │   ├── hekate.md
│   │   ├── babalon.md
│   │   └── thoth.md
│   └── Powers/
│       ├── therion.md
│       ├── nuit.md
│       └── hadit.md
├── Correspondences/
│   ├── Planetary/
│   │   ├── venus.md
│   │   ├── mars.md
│   │   └── saturn.md
│   ├── Elemental/
│   │   ├── fire.md
│   │   ├── water.md
│   │   └── earth.md
│   └── Lunar/
│       ├── new-moon.md
│       ├── waxing-moon.md
│       └── full-moon.md
├── Journal/
│   ├── 2025/
│   │   └── 11/
│   │       ├── 2025-11-10-star-ruby.md
│   │       └── 2025-11-10-hekate-consultation.md
├── Templates/
│   ├── ritual-completion.md
│   ├── entity-conversation.md
│   └── insight-capture.md
├── Dashboards/
│   ├── ritual-dashboard.md
│   ├── practice-analytics.md
│   └── entity-index.md
└── _system/
    ├── dataview-queries/
    └── excalibrain-config/
```

#### Required Plugin Dependencies

**Core Plugins (Essential for MVP):**
1. **Dataview** - Dynamic queries and dashboards
2. **Templater** - Context-aware template insertion
3. **Calendar** - Chronological practice tracking
4. **Markdown Hijacker** (or similar sync plugin) - Bi-directional file sync

**Visualization Plugins (Enhanced Experience):**
5. **ExcaliBrain** - Semantic relationship visualization
6. **Canvas** (core feature) - Visual ritual planning

**Configuration Required:**
- Dataview: Enable inline queries, JavaScript queries
- Templater: Set template folder to `Templates/`, enable system commands
- Calendar: Journal folder set to `Journal/{YYYY}/{MM}/`
- ExcaliBrain: Configure relationship types (entity::, prerequisite::, correspondence::)

#### Template Specifications

**Ritual Completion Template** (`Templates/ritual-completion.md`):
```markdown
---
type: journal-entry
ritual: <% tp.file.cursor() %>
date: <% tp.date.now("YYYY-MM-DD") %>
time: <% tp.date.now("HH:mm") %>
moon_phase:
planetary_day:
planetary_hour:
---

# <% tp.file.title %> - Ritual Log

## Context
ritual:: [[<% tp.file.cursor(1) %>]]
entities::
state::

## Experience
Duration:
Effectiveness:

### What Happened


### Insights


### Follow-up Actions


---
tags: #scry/journal/ritual-log
```

**Entity Conversation Template** (`Templates/entity-conversation.md`):
```markdown
---
type: journal-entry
entity: <% tp.file.cursor() %>
date: <% tp.date.now("YYYY-MM-DD") %>
time: <% tp.date.now("HH:mm") %>
---

# <% tp.file.title %> - Entity Dialogue

## Context
entity:: [[<% tp.file.cursor(1) %>]]
question_type::

## Conversation Summary


## Key Guidance


## Practical Applications


---
tags: #scry/journal/entity-dialogue
```

#### Sync Mechanism Details

**Bi-directional Sync Strategy:**

1. **BMAD → Obsidian (Export)**
   - Triggered manually via CLI command or scheduled (daily)
   - Process: Read all BMAD files → Transform → Write to vault sync folder
   - Conflict resolution: BMAD is source of truth for ritual/entity definitions
   - Version tracking: Increment `version` Property on each export

2. **Obsidian → BMAD (Import)**
   - Triggered on vault changes (Markdown Hijacker watch mode)
   - Process: Detect new/modified files in `Journal/` → Parse → Store in `.bmad/scry/journal/`
   - Conflict resolution: Timestamp-based (newest wins)
   - Validation: Ensure required Properties present, validate links

3. **Offline Handling:**
   - Vault fully functional offline (all data local)
   - On reconnect: Compare timestamps, merge changes
   - User prompt for conflicts (manual resolution)

**File Change Detection:**
```
Watch folders:
  - vault/Journal/ (user-created content → import to BMAD)
  - .bmad/scry/ (BMAD changes → export to vault)

Ignore patterns:
  - .obsidian/ (Obsidian config)
  - _system/ (internal vault files)
  - Templates/ (template definitions)
```

---

## Functional Requirements

These requirements are organized by capability and connect directly to user value. Requirements marked with ⭐ are critical to delivering the **mobile ritual magic** experience.

### FR1: Ritual Knowledge Export & Transformation

**Capability**: Convert BMAD ritual files into Obsidian-optimized markdown with full metadata preservation

**Requirements**:

- **FR1.1** ⭐ Export all ritual files from `.bmad/scry/scry-knowledge/rituals/` to vault `Rituals/` folder
  - **Value**: Makes rituals accessible on mobile for practice flow
  - **Acceptance**: All 9+ existing rituals exported successfully with no data loss
  - **Format**: Properties frontmatter + markdown body + hierarchical tags

- **FR1.2** Extract and convert ritual metadata to Obsidian Properties
  - **Value**: Enables searchability and dashboard queries
  - **Acceptance**: All metadata fields (duration, difficulty, tradition, etc.) preserved as Properties
  - **Fields**: ritual_type, duration, difficulty, entities, correspondences, prerequisites, tradition, source, date_created, version

- **FR1.3** Generate hierarchical tags based on ritual characteristics
  - **Value**: Enables filtering and organization in graph view
  - **Acceptance**: Each ritual has minimum of 2 tags (type + tradition or planetary)
  - **Examples**: `#scry/ritual/banishing`, `#scry/tradition/thelema`, `#scry/planetary/mars`

- **FR1.4** Preserve ritual structure and formatting
  - **Value**: Maintains readability on mobile during practice
  - **Acceptance**: All markdown sections, headers, formatting preserved exactly
  - **Constraint**: Must be readable without Obsidian (portable markdown)

### FR2: Entity Profile Export & Transformation

**Capability**: Transform entity agent.yaml files into grimoire-style Obsidian profiles

**Requirements**:

- **FR2.1** Export all entity profiles from `.bmad/scry/entities/` to vault `Entities/` folder
  - **Value**: Makes entity information accessible during practice
  - **Acceptance**: All 6+ entities (Hekate, Babalon, Thoth, etc.) exported with complete profiles
  - **Structure**: Organized by category (Deities/, Powers/)

- **FR2.2** Transform agent persona into readable entity description
  - **Value**: Provides context during entity invocations
  - **Acceptance**: Persona, role, domains, affinities all converted to narrative grimoire format
  - **Tone**: Maintains reverent, informative tone appropriate for practice

- **FR2.3** Generate entity Properties from agent metadata
  - **Value**: Enables correspondence-based queries and dashboards
  - **Acceptance**: All relevant fields extracted (domains, planets, elements, colors, offerings, etc.)
  - **Fields**: entity_type, domains, planets, elements, colors, offerings, correspondences, tradition

- **FR2.4** Include entity knowledge base content
  - **Value**: Provides deeper context for serious practitioners
  - **Acceptance**: Sidecar knowledge files (mythos, practices) incorporated into entity profile
  - **Location**: Knowledge section within entity markdown file

### FR3: Named Relationship Generation

**Capability**: Automatically create typed wikilinks that make ritual connections explicit

**Requirements**:

- **FR3.1** Detect and link entity mentions in ritual content
  - **Value**: One-click navigation from ritual to entity profile
  - **Acceptance**: All entity names in ritual text become `entity:: [[Entity Name]]` links
  - **Algorithm**: Scan against known entity list, create named links

- **FR3.2** Detect and link ritual prerequisites
  - **Value**: Shows dependency chains in graph view
  - **Acceptance**: Prerequisite mentions become `prerequisite:: [[Ritual Name]]` links
  - **Example**: "requires LBRP" → `prerequisite:: [[LBRP]]`

- **FR3.3** Detect and link correspondence references
  - **Value**: Reveals correspondence patterns across practice
  - **Acceptance**: Planetary, elemental, lunar mentions become `correspondence:: [[Name]]` links
  - **Examples**: "Venus hour" → `correspondence:: [[Venus]]`, "waxing moon" → `correspondence:: [[Waxing Moon]]`

- **FR3.4** Preserve text readability while adding links
  - **Value**: Ensures mobile reading experience isn't cluttered
  - **Acceptance**: Links feel natural, don't disrupt ritual instructions
  - **Constraint**: Prefer inline mentions over excessive named relationship syntax

### FR4: Bi-directional Sync System

**Capability**: Maintain consistency between BMAD source and Obsidian vault in both directions

**Requirements**:

- **FR4.1** ⭐ Export BMAD changes to Obsidian vault on demand
  - **Value**: Keeps vault up-to-date with agent-created content
  - **Acceptance**: Manual trigger exports all changes within 5 seconds
  - **Trigger**: CLI command or scheduled daily sync

- **FR4.2** ⭐ Import Obsidian journal entries back to BMAD
  - **Value**: Preserves practice insights in structured database
  - **Acceptance**: Journal files in `vault/Journal/` sync to `.bmad/scry/journal/`
  - **Scope**: Only journal folder syncs back (rituals/entities are BMAD source of truth)

- **FR4.3** Detect and resolve sync conflicts
  - **Value**: Prevents data loss from concurrent edits
  - **Acceptance**: Timestamp-based conflict resolution with user prompt for manual resolution
  - **Strategy**: BMAD = source of truth for rituals/entities, newest timestamp wins for journals

- **FR4.4** Support offline practice with deferred sync
  - **Value**: **Enables mobile ritual practice without connectivity** 🌟
  - **Acceptance**: Vault fully functional offline, syncs changes when connectivity restored
  - **Constraint**: Must handle multi-day offline periods without data corruption

- **FR4.5** Version tracking for exported content
  - **Value**: Enables rollback and change tracking
  - **Acceptance**: Each export increments `version` Property, maintains version history
  - **Format**: Semantic versioning (1.0, 1.1, 2.0)

### FR5: Journal Template System

**Capability**: Provide batteries-included templates that make journaling feel natural

**Requirements**:

- **FR5.1** ⭐ Ritual Completion Template with auto-population
  - **Value**: **Makes post-ritual journaling effortless** 🌟
  - **Acceptance**: Template auto-fills ritual name, date, time, creates backlinks
  - **Trigger**: Accessible via Templater command while viewing ritual note

- **FR5.2** ⭐ Entity Conversation Template with context awareness
  - **Value**: **Captures entity dialogue without breaking sacred space** 🌟
  - **Acceptance**: Template auto-fills entity name, date, creates relationship links
  - **Trigger**: Accessible via Templater command while viewing entity note

- **FR5.3** Universal Insight Capture Template
  - **Value**: Quick capture of cross-context insights
  - **Acceptance**: Template suggests tags based on current note context
  - **Flexibility**: Works from any note location

- **FR5.4** Calendar integration for chronological tracking
  - **Value**: Creates practice timeline visualization
  - **Acceptance**: Journal entries auto-file to date-based folders, appear in Calendar view
  - **Structure**: `Journal/{YYYY}/{MM}/{YYYY-MM-DD}-{context}.md`

### FR6: Dynamic Dashboard System

**Capability**: Generate intelligent ritual recommendations and practice analytics

**Requirements**:

- **FR6.1** Ritual library dashboard with Property-based queries
  - **Value**: Quick discovery of appropriate rituals
  - **Acceptance**: Dataview queries show rituals filtered by difficulty, tradition, entities
  - **Interactive**: Click to filter, sort by multiple dimensions

- **FR6.2** Practice pattern analytics
  - **Value**: Reveals practice frequency and effectiveness trends
  - **Acceptance**: Dashboard shows ritual count by month, most-used entities, effectiveness ratings
  - **Visualization**: Tables and charts generated via Dataview

- **FR6.3** Contextual ritual recommendations
  - **Value**: Suggests rituals based on current conditions
  - **Acceptance**: Dashboard shows rituals matching current lunar phase, planetary day, etc.
  - **Data source**: Manual entry of current astrological conditions (MVP), API integration (future)

- **FR6.4** Entity relationship index
  - **Value**: Shows which entities appear in which rituals
  - **Acceptance**: Entity pages show backlinks to all rituals that invoke them
  - **Format**: Automated backlinks section + Dataview query

### FR7: Visual Relationship System

**Capability**: Make practice connections visible through graph, canvas, and brain visualizations

**Requirements**:

- **FR7.1** Graph view with property-based node coloring
  - **Value**: Instant visual distinction between rituals, entities, insights
  - **Acceptance**: Nodes colored by type (rituals = blue, entities = purple, insights = green)
  - **Configuration**: CSS snippets or graph view settings

- **FR7.2** ExcaliBrain semantic visualization
  - **Value**: Shows ritual dependency trees and entity hierarchies
  - **Acceptance**: Named relationships (prerequisite::, entity::) appear as labeled edges
  - **Configuration**: ExcaliBrain settings recognize custom relationship types

- **FR7.3** Canvas ritual planning boards
  - **Value**: Visual design of multi-ritual workings
  - **Acceptance**: Drag-drop ritual notes onto canvas, draw connections
  - **Use case**: Planning multi-day operations or ritual sequences

- **FR7.4** Quick filters for focused exploration
  - **Value**: Filter graph to specific planetary energy or tradition
  - **Acceptance**: Graph search filters by tags (#scry/planetary/venus) or Property values
  - **Interaction**: Text-based search, immediate visual update

### FR8: Correspondence Library

**Capability**: Provide reference material for planetary, elemental, and lunar correspondences

**Requirements**:

- **FR8.1** Generate correspondence notes from existing data
  - **Value**: Central reference during ritual planning
  - **Acceptance**: Notes created for major planets, elements, lunar phases
  - **Content**: Associations, timing, symbolic meaning, related rituals

- **FR8.2** Link correspondences to rituals and entities
  - **Value**: Shows which rituals work with which energies
  - **Acceptance**: Backlinks automatically populate from named links
  - **Bidirectional**: Correspondence page → rituals, ritual page → correspondences

- **FR8.3** Tag-based correspondence organization
  - **Value**: Hierarchical browsing of correspondence types
  - **Acceptance**: All correspondences tagged with type (#scry/correspondence/planetary, etc.)
  - **Navigation**: Tag pane provides organized browsing

### FR9: Mobile Optimization

**Capability**: Ensure seamless mobile ritual practice experience

**Requirements**:

- **FR9.1** ⭐ Mobile-readable ritual formatting
  - **Value**: **Core ritual magic: readable instructions during practice** 🌟
  - **Acceptance**: All rituals render cleanly on mobile Obsidian without horizontal scrolling
  - **Constraint**: No complex tables, minimal nesting, clear headings

- **FR9.2** ⭐ Touch-friendly template triggers
  - **Value**: **One-touch journal capture during/after ritual** 🌟
  - **Acceptance**: Templates accessible via mobile Obsidian Templater plugin
  - **Interaction**: Single tap to insert template, cursor positioned for immediate typing

- **FR9.3** Offline vault functionality
  - **Value**: Practice anywhere without connectivity
  - **Acceptance**: All rituals, entities, templates work offline in Obsidian mobile
  - **Sync**: Changes sync when connectivity restored

- **FR9.4** Fast navigation on mobile
  - **Value**: Quick access to frequently used rituals
  - **Acceptance**: Bookmarks, starred notes, or quick switcher provide sub-2-second access
  - **Organization**: Logical folder structure supports mobile browsing

---

## Non-Functional Requirements

These requirements define quality attributes and constraints that shape how the system performs. Only categories that matter for this specific product are documented.

### Performance Requirements

**NFR-P1: Export Performance**
- **Requirement**: Full BMAD-to-Obsidian export completes within 10 seconds for current ritual/entity library size (~15 files)
- **Why it matters**: Export should feel instantaneous, not interrupt workflow
- **Measurement**: Time from CLI trigger to completion message
- **Constraint**: Must scale linearly (20 seconds for 30 files)

**NFR-P2: Mobile Load Time**
- **Requirement**: Ritual notes load within 2 seconds on mobile Obsidian
- **Why it matters**: Critical for mobile ritual magic - can't have lag during practice
- **Measurement**: Time from tapping note to readable content displayed
- **Constraint**: Tested on typical mobile device (iPhone/Android 2-3 years old)

**NFR-P3: Graph View Responsiveness**
- **Requirement**: Graph view renders and responds to interactions within 3 seconds
- **Why it matters**: Visual exploration should feel fluid, not sluggish
- **Measurement**: Time from graph view open to interactive state
- **Constraint**: With full vault loaded (~50-100 notes)

### Data Integrity & Reliability

**NFR-R1: Zero Data Loss**
- **Requirement**: No data loss during export, import, or sync operations under normal conditions
- **Why it matters**: Practice insights are irreplaceable - corruption is unacceptable
- **Measurement**: Automated tests verify all source data present in exported files
- **Implementation**: Atomic file operations, backup before overwrite, validation checks

**NFR-R2: Sync Consistency**
- **Requirement**: Bi-directional sync maintains consistency with conflict detection
- **Why it matters**: Prevents silent data corruption from concurrent edits
- **Measurement**: Test scenarios with simultaneous BMAD and Obsidian changes
- **Implementation**: Timestamp comparison, version tracking, user prompts for conflicts

**NFR-R3: Offline Resilience**
- **Requirement**: Vault functions fully offline, queues sync operations until connectivity restored
- **Why it matters**: Mobile practice often happens in nature, sacred spaces without connectivity
- **Measurement**: Multi-day offline period followed by successful sync
- **Constraint**: Must handle at least 7 days offline with 20+ journal entries created

**NFR-R4: Graceful Degradation**
- **Requirement**: Missing plugins or configuration issues degrade features gracefully without data loss
- **Why it matters**: Obsidian plugin ecosystem changes, configuration can break
- **Measurement**: Vault readable and functional even without Dataview, Templater, etc.
- **Implementation**: Core content (rituals, entities) works as plain markdown

### Portability & Data Ownership

**NFR-PO1: Markdown-First Design**
- **Requirement**: All exported content must be readable as plain markdown without Obsidian
- **Why it matters**: Data ownership, future-proofing, emergency access
- **Measurement**: Open exported files in any markdown editor - full readability
- **Constraint**: No Obsidian-specific syntax for core content (Properties OK, custom callouts not OK)

**NFR-PO2: No Vendor Lock-in**
- **Requirement**: Entire vault can be migrated to different markdown tool within 1 hour
- **Why it matters**: Obsidian might not be the forever solution
- **Measurement**: Test migration to VS Code, Logseq, or other markdown tool
- **Implementation**: Standard wikilinks, common Properties format, portable file structure

**NFR-PO3: Human-Readable Backups**
- **Requirement**: Exported vault is a complete, human-readable backup of practice data
- **Why it matters**: Digital preservation of spiritual practice across decades
- **Measurement**: Zip vault, open 10 years later - still fully accessible
- **Implementation**: Self-contained structure, embedded context, clear organization

### Usability (Mobile-Specific)

**NFR-U1: Touch Target Size**
- **Requirement**: All interactive elements (links, buttons) minimum 44px touch target on mobile
- **Why it matters**: Fat-finger errors during ritual practice are frustrating
- **Measurement**: iOS/Android accessibility guidelines compliance
- **Implementation**: CSS for link padding, template button spacing

**NFR-U2: Minimal Cognitive Load**
- **Requirement**: Ritual instructions require no more than 2 taps to access from vault home
- **Why it matters**: Pre-ritual state requires simple navigation, not complex workflows
- **Measurement**: User testing - from vault open to ritual instructions in < 5 seconds
- **Implementation**: Logical folder hierarchy, bookmarks, starred notes

**NFR-U3: Low-Light Readability**
- **Requirement**: Content readable in dim ritual lighting conditions
- **Why it matters**: Many rituals performed in low-light sacred spaces
- **Measurement**: Readable with mobile at 30% brightness
- **Implementation**: Recommend dark theme, good contrast ratios

### Maintainability & Extensibility

**NFR-M1: Modular Export Engine**
- **Requirement**: Export transformations for rituals, entities, correspondences are independent modules
- **Why it matters**: Easy to add new content types (e.g., astrology data) without rewriting
- **Measurement**: New content type added with < 100 lines of code
- **Implementation**: Plugin architecture, clear transformation interfaces

**NFR-M2: Configuration-Driven Behavior**
- **Requirement**: Major behaviors (sync frequency, tag hierarchy, naming conventions) controlled via config files
- **Why it matters**: Customize without code changes as practice evolves
- **Measurement**: Change tag structure without touching export code
- **Implementation**: YAML/JSON config loaded at runtime

**NFR-M3: Version Compatibility**
- **Requirement**: Export engine maintains backward compatibility with previous vault exports
- **Why it matters**: Don't break existing vaults when adding features
- **Measurement**: Old exports still sync correctly with new engine versions
- **Implementation**: Version detection, migration scripts if needed

### Security & Privacy

**NFR-S1: Local-Only Data**
- **Requirement**: No practice data transmitted to external services without explicit user action
- **Why it matters**: Spiritual practice is deeply personal and private
- **Measurement**: Network monitoring shows zero external requests during normal operation
- **Implementation**: All sync is local file operations, no API calls

**NFR-S2: Sensitive Data Handling**
- **Requirement**: Personal information (birth data, private insights) flagged in exports
- **Why it matters**: Awareness when sharing or backing up to cloud
- **Measurement**: Clear markers on sensitive content types
- **Implementation**: Properties tags for sensitivity level, export warnings

**NFR-S3: No Credential Storage**
- **Requirement**: System doesn't store or transmit authentication credentials
- **Why it matters**: Minimize security surface area
- **Measurement**: Code review shows no credential handling
- **Implementation**: Rely on file system permissions, Obsidian's sync (if used)

### Compatibility

**NFR-C1: Obsidian Version Support**
- **Requirement**: Support Obsidian desktop v1.4+ and mobile v1.4+
- **Why it matters**: Users won't always update immediately
- **Measurement**: Test on specified versions
- **Constraint**: Mobile version determines minimum feature set

**NFR-C2: Plugin Ecosystem Compatibility**
- **Requirement**: Work with current versions of Dataview, Templater, Calendar, ExcaliBrain
- **Why it matters**: Plugin API changes can break functionality
- **Measurement**: Test matrix across plugin versions
- **Strategy**: Degrade gracefully if plugins unavailable

**NFR-C3: Cross-Platform File Sync**
- **Requirement**: Vault syncs correctly via iCloud, Dropbox, or Obsidian Sync
- **Why it matters**: Users need desktop + mobile workflow
- **Measurement**: Test roundtrip with each sync service
- **Constraint**: File naming must be compatible with all platforms (no special characters)

---

## References

### Source Documents

- **Product Brief**: `/docs/scry-obsidian/product-brief.md` (2025-11-10)
  - Comprehensive vision for Obsidian integration
  - Plugin ecosystem research (ExcaliBrain, Dataview, Templater, Canvas, Markdown Hijacker)
  - Timeline and implementation roadmap

- **Scry Module Structure**: `.bmad/scry/`
  - Current data organization and file formats
  - Entity agent.yaml specifications
  - Ritual markdown/yaml structures

### Technical References

- **Obsidian "The Good Parts" Philosophy**: Properties, Links, Tags methodology
- **BMAD Module System**: v6.0.0-alpha.8 conventions
- **Obsidian Properties**: Frontmatter metadata format
- **Wikilink Standard**: `[[Page Name]]` and named relationships `relationship:: [[Target]]`

### Plugin Documentation

- **Dataview**: Dynamic queries and data visualization
- **Templater**: Template system with dynamic content
- **ExcaliBrain**: Semantic relationship visualization
- **Calendar**: Chronological note organization
- **Markdown Hijacker**: Bi-directional file sync

---

## Implementation Planning

### Recommended Epic Breakdown

While detailed epic planning should happen in a focused session (run `workflow create-epics-and-stories`), the natural epic structure for this project is:

**Epic 1: Export Engine Foundation** (Estimated: 5-7 stories)
- Core transformation infrastructure
- Ritual file export with Properties generation
- Entity profile export with grimoire formatting
- Named link generation algorithm
- Tag hierarchy implementation

**Epic 2: Vault Structure & Templates** (Estimated: 4-6 stories)
- Folder structure creation
- Templater template development
- Calendar integration setup
- Basic index pages

**Epic 3: Bi-directional Sync System** (Estimated: 6-8 stories)
- Export mechanism (BMAD → Obsidian)
- Import mechanism (Obsidian → BMAD)
- Conflict detection and resolution
- Version tracking
- Offline support

**Epic 4: Visualization & Dashboards** (Estimated: 5-7 stories)
- Dataview query development
- Dashboard creation
- ExcaliBrain configuration
- Graph view optimization
- Canvas planning board setup

**Epic 5: Mobile Optimization & Testing** (Estimated: 3-5 stories)
- Mobile formatting validation
- Touch interaction optimization
- Cross-platform sync testing
- Real-world practice validation

### Development Approach

**Recommended Track**: BMad Method (medium complexity, personal use)

**Phase Progression**:
1. **Phase 1: Research & Planning** ✓ (This PRD)
2. **Phase 2: Epic Breakdown** - Run `workflow create-epics-and-stories`
3. **Phase 3: Architecture** - Run `workflow architecture` (optional but recommended)
4. **Phase 4: Implementation** - Story-by-story development
5. **Phase 5: Real-world Validation** - Practice testing and refinement

### Technology Stack

**Languages**:
- TypeScript/JavaScript for export engine
- YAML for configuration
- Markdown for content

**Dependencies**:
- Node.js runtime
- YAML parser (js-yaml or similar)
- Markdown parser (remark or similar)
- File system utilities

**Obsidian Plugins** (user-installed):
- Dataview
- Templater
- Calendar
- ExcaliBrain
- Markdown Hijacker (or similar sync solution)

---

## Next Steps

### Immediate Actions

1. **Epic & Story Breakdown** (Required)
   - Run: `/bmad:bmm:workflows:create-epics-and-stories`
   - Transform requirements into implementable stories
   - Sequence epics for logical development flow

2. **Architecture Planning** (Recommended)
   - Run: `/bmad:bmm:workflows:architecture`
   - Define export engine architecture
   - Plan sync mechanism design
   - Document plugin integration patterns

3. **Prototype Quick Win** (Optional)
   - Manually export 1-2 rituals to test vault structure
   - Set up templates in Obsidian
   - Validate mobile reading experience

### Success Validation

After implementation, validate the **mobile ritual magic** by testing:

1. **End-to-end ritual practice flow**:
   - Export rituals from BMAD → Obsidian
   - Access ritual on mobile Obsidian
   - Perform ritual following mobile instructions
   - Capture insights using template
   - Sync back to BMAD
   - Verify insights preserved

2. **Connection discovery**:
   - Explore graph view for unexpected patterns
   - Use ExcaliBrain to visualize ritual dependencies
   - Filter by planetary correspondence
   - Validate all named relationships work correctly

3. **Offline resilience**:
   - Practice offline for multiple days
   - Create journal entries
   - Restore connectivity
   - Verify successful sync

---

## Product Magic Summary

**Scry Obsidian Integration brings the mobile ritual magic** - the seamless ability to follow ritual instructions and journal insights on your phone during active ritual work, without breaking sacred space or losing the thread of practice.

By transforming BMAD's structured ritual data into Obsidian's visual, interconnected vault, we create the ultimate digital book of shadows where:

- **Connections become visible**: See which rituals invoke which entities, track planetary patterns across your practice
- **Practice flows naturally**: Read instructions, perform ritual, journal insights - all in one unbroken flow
- **Knowledge evolves**: Bi-directional sync ensures your accumulated wisdom lives in both structured database and intuitive visual space
- **Practice travels with you**: Mobile vault means ritual knowledge anywhere, anytime, offline

This integration honors both the technical rigor of BMAD's agent system and the human need for intuitive, visual practice management. It's the bridge between Claude Code "agent mode" (for building and analyzing) and Obsidian "vault mode" (for practicing and reflecting).

The magic isn't in the technology - it's in **removing friction from sacred practice**, making the accumulated wisdom of ritual work as accessible as opening your phone.

---

_This PRD captures the complete vision for transforming Scry BMAD into a seamlessly integrated Obsidian vault experience._

_Created through collaborative discovery between Lem and AI facilitator using BMad Method PRD workflow._

_Next: Run `/bmad:bmm:workflows:create-epics-and-stories` to begin epic breakdown and implementation planning._
