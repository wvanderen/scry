# scry - Obsidian Integration Epic Breakdown

**Author:** Lem
**Date:** 2025-11-10
**Project Level:** Medium
**Target Scale:** Personal Developer Tool + Desktop Integration

---

## Overview

This document provides the complete epic and story breakdown for the Scry Obsidian Integration, decomposing the requirements from the [PRD](./PRD.md) into implementable stories.

## Epic Structure Summary

This project naturally divides into **5 epics** that follow the logical progression from foundation → content transformation → synchronization → visualization → mobile optimization:

### Epic 1: Export Engine Foundation (Foundation & Core Infrastructure)
**Value**: Establish the technical foundation that enables all content transformation
**Scope**: Project setup, core transformation architecture, configuration system, file operations
**Sequencing**: MUST be first - creates the engine that powers all subsequent work
**Stories**: 5 stories covering setup, architecture, and core utilities

### Epic 2: Content Transformation & Link Generation (Data Intelligence)
**Value**: Transform BMAD data into Obsidian-optimized markdown with intelligent relationships
**Scope**: Ritual export, entity export, named link generation, tag hierarchy, Properties generation
**Sequencing**: Second - builds on foundation to create core content transformation capability
**Stories**: 7 stories covering ritual/entity export and relationship intelligence

### Epic 3: Bi-directional Sync & Data Integrity (Sync Engine)
**Value**: Maintain consistency between BMAD source and Obsidian vault with zero data loss
**Scope**: Export mechanism, import mechanism, conflict resolution, version tracking, offline support
**Sequencing**: Third - synchronization depends on having content to sync
**Stories**: 6 stories covering all sync scenarios and edge cases

### Epic 4: Obsidian Vault Experience (User Interface & Discovery)
**Value**: Create the immersive Obsidian experience with templates, dashboards, and visualizations
**Scope**: Vault structure, journal templates, dashboards, graph optimization, correspondence library
**Sequencing**: Fourth - enhances the content and sync foundation with user-facing features
**Stories**: 8 stories covering templates, queries, and visualization setup

### Epic 5: Mobile Optimization & Real-World Validation (The Mobile Ritual Magic)
**Value**: Deliver the core product magic - seamless mobile ritual practice flow
**Scope**: Mobile formatting, touch optimization, cross-platform sync testing, real-world practice validation
**Sequencing**: Fifth and final - validates the entire system delivers on the promise
**Stories**: 4 stories covering mobile-specific refinements and end-to-end testing

**Total Stories**: 30 implementable stories, each sized for single-session completion

---

## Epic 1: Export Engine Foundation

**Goal**: Establish the technical foundation that enables all content transformation by creating the core infrastructure, configuration system, and file operation utilities that power the entire export engine.

### Story 1.1: Project Setup & Export Infrastructure

As a developer,
I want to establish the project structure and core dependencies for the export engine,
So that I have a solid foundation for building the Obsidian integration.

**Acceptance Criteria:**

**Given** I need to create an export engine for Scry-to-Obsidian transformation
**When** I set up the project structure
**Then** the following are created:
- Project directory: `/packages/scry-obsidian-export/` or similar
- TypeScript configuration with strict mode enabled
- Package.json with dependencies: Node.js file system utilities, YAML parser (js-yaml), Markdown parser (remark)
- Basic build pipeline (esbuild or tsc)
- Entry point module with placeholder export function
- README with project purpose and architecture overview

**And** the build pipeline successfully compiles TypeScript to JavaScript
**And** basic smoke test runs successfully

**Prerequisites:** None (foundation story)

**Technical Notes:** This is the foundation story - sets up repo structure, dependencies, and build system. Consider monorepo structure if planning multiple Scry subprojects.

---

### Story 1.2: Configuration Management System

As a developer,
I want to load and manage configuration from BMAD module files,
So that the export engine can dynamically locate source files and understand project structure.

**Acceptance Criteria:**

**Given** BMAD configuration exists at `.bmad/scry/config.yaml` or `.bmad/bmm/config.yaml`
**When** I initialize the export engine
**Then** configuration is loaded with the following data:
- Project root path
- BMAD scry module location (`.bmad/scry/`)
- Source paths: rituals folder, entities folder, knowledge folder
- Target vault path (user-configurable, default: `./obsidian-vault/`)
- Export options: tag hierarchy preferences, naming conventions, sync mode

**And** configuration validation ensures all required paths exist
**And** helpful error messages guide user if paths are missing or invalid
**And** configuration can be overridden via CLI arguments or environment variables

**Prerequisites:** Story 1.1

**Technical Notes:** Use cosmiconfig or similar for flexible config loading. Support both `.bmad/scry/` (Scry module) and `.bmad/bmm/` (BMM config) locations.

---

### Story 1.3: File System Utilities & Safe Operations

As a developer,
I want robust file system utilities with atomic write operations,
So that file operations never corrupt data and handle edge cases gracefully.

**Acceptance Criteria:**

**Given** I need to read and write markdown/YAML files safely
**When** I use the file system utilities
**Then** the following functions are available:
- `readMarkdownFile(path)` - returns parsed frontmatter + content
- `readYAMLFile(path)` - returns parsed YAML object
- `writeMarkdownFileAtomic(path, frontmatter, content)` - atomic write with temp file + rename
- `ensureDirectoryExists(path)` - creates directory tree if missing
- `copyFile(source, dest)` - with overwrite protection option
- `listFilesRecursive(path, pattern)` - glob-style file discovery

**And** atomic writes use temp file + rename pattern to prevent corruption
**And** all operations handle errors gracefully with descriptive messages
**And** symlinks are followed safely (or skipped with warning)
**And** unit tests verify all edge cases (missing files, permissions, encoding issues)

**Prerequisites:** Story 1.1

**Technical Notes:** Use `fs.promises` for async operations. Consider `write-file-atomic` npm package. Handle UTF-8 encoding explicitly.

---

### Story 1.4: YAML & Markdown Parsing Infrastructure

As a developer,
I want to parse BMAD ritual and entity files into structured data,
So that I can extract metadata and content for transformation.

**Acceptance Criteria:**

**Given** BMAD ritual files (`.md` with YAML frontmatter or standalone `.yaml`) and entity agent.yaml files exist
**When** I parse these files
**Then** ritual parsing returns:
- YAML frontmatter as object (metadata: duration, difficulty, entities, correspondences, etc.)
- Markdown sections as array (headers + content)
- Inline metadata extracted (entity mentions, correspondence references)

**And** entity parsing returns:
- Agent metadata (name, persona, role, domains, affinities)
- Correspondence data (planets, elements, colors, offerings)
- Sidecar knowledge file paths (for later inclusion)

**And** parsing handles missing fields gracefully with sensible defaults
**And** validation warns about malformed YAML or markdown structure
**And** parser preserves original formatting for round-trip capability

**Prerequisites:** Story 1.3

**Technical Notes:** Use `js-yaml` for YAML, `remark` or `markdown-it` for markdown. Consider `gray-matter` for frontmatter parsing. Create TypeScript interfaces for parsed structures.

---

### Story 1.5: Test Framework & Sample Data Setup

As a developer,
I want a comprehensive test framework with sample ritual/entity data,
So that I can validate transformation logic against realistic inputs.

**Acceptance Criteria:**

**Given** I need to test the export engine with realistic data
**When** I set up the test framework
**Then** the following are created:
- Test directory structure: `/test/fixtures/` with sample data
- Sample ritual files: 2-3 rituals (banishing, invocation, devotional) with varied metadata
- Sample entity files: 2-3 entities (deity, archetype) with different correspondence sets
- Test utilities: helper functions for file comparison, assertion helpers
- Jest or Vitest configuration with TypeScript support
- Test coverage reporting (target: >80% for core utilities)

**And** sample data represents realistic variety from actual Scry module
**And** all unit tests for Stories 1.1-1.4 pass successfully
**And** integration test validates full file read → parse → validate workflow
**And** CI/CD configuration runs tests automatically (if using GitHub Actions or similar)

**Prerequisites:** Stories 1.1-1.4

**Technical Notes:** Use actual Scry ritual/entity files as fixtures (anonymize if needed). Consider snapshot testing for markdown output validation.

---

## Epic 2: Content Transformation & Link Generation

**Goal**: Transform BMAD data into Obsidian-optimized markdown with intelligent relationship detection, creating the explicit connections that make the "ultimate digital book of shadows" discoverable and navigable.

### Story 2.1: Ritual Export with Properties Generation

As a practitioner,
I want rituals exported from BMAD to Obsidian with rich metadata as Properties,
So that I can search, filter, and query my ritual library by duration, difficulty, entities, and correspondences.

**Acceptance Criteria:**

**Given** BMAD ritual files exist in `.bmad/scry/scry-knowledge/rituals/`
**When** I run the export engine
**Then** each ritual is exported to `vault/Rituals/{category}/{ritual-name}.md` with:
- Obsidian Properties frontmatter containing:
  - `ritual_type` (banishing, invocation, meditation, devotional)
  - `duration` (in minutes)
  - `difficulty` (beginner, intermediate, advanced)
  - `entities` (array of entity names)
  - `correspondences` (array of planetary/elemental associations)
  - `prerequisites` (array of prerequisite ritual names)
  - `tradition` (Thelema, Hermetic, Greek, etc.)
  - `source` (book/text reference if applicable)
  - `date_created` (export timestamp)
  - `version` (1.0 initially)
- Markdown body preserving all sections and formatting
- File naming: kebab-case (e.g., `star-ruby-liber-xxv.md`)

**And** missing metadata fields use sensible defaults or are omitted
**And** multi-file rituals (YAML + MD) are merged into single output
**And** export handles all 9+ existing Scry rituals successfully

**Prerequisites:** Epic 1 Complete

**Technical Notes:** Map BMAD metadata fields to Obsidian Properties. Handle both `.md` with frontmatter and standalone `.yaml` + `.md` combinations. Organize by ritual_type subdirectory.

---

### Story 2.2: Entity Profile Export with Grimoire Formatting

As a practitioner,
I want entity agent files transformed into grimoire-style Obsidian profiles,
So that I have rich, reverent entity descriptions accessible during invocations and practice.

**Acceptance Criteria:**

**Given** Entity agent.yaml files exist in `.bmad/scry/entities/*/`
**When** I export entities
**Then** each entity is exported to `vault/Entities/{category}/{entity-name}.md` with:
- Obsidian Properties:
  - `entity_type` (deity, archetype, spirit, angel, power)
  - `domains` (array of domain areas)
  - `planets` (array of planetary correspondences)
  - `elements` (array of elemental associations)
  - `colors` (array of color correspondences)
  - `offerings` (array of traditional offerings)
  - `correspondences` (array of symbolic associations)
  - `tradition` (source tradition)
- Markdown body containing:
  - Entity description (transformed from agent persona)
  - Domains and affinities section
  - Correspondence tables
  - Ritual associations (placeholder for backlinks)
  - Knowledge base content (from sidecar files)
- Grimoire-appropriate tone (reverent, informative, not technical)

**And** agent "persona" is converted to narrative description, not technical agent instructions
**And** all 6+ Scry entities export successfully with complete profiles

**Prerequisites:** Epic 1 Complete

**Technical Notes:** Transform agent.yaml structure into human-readable grimoire format. Include sidecar knowledge files. Organize by entity type (Deities/, Powers/, etc.).

---

### Story 2.3: Named Relationship Link Generation

As a practitioner,
I want automatic typed wikilinks between related content,
So that I can navigate from rituals to entities to correspondences with one click and see relationships in graph view.

**Acceptance Criteria:**

**Given** exported rituals and entities reference each other
**When** the link generator processes content
**Then** the following named relationships are created:
- Entity mentions → `entity:: [[Entity Name]]`
- Ritual prerequisites → `prerequisite:: [[Ritual Name]]`
- Planetary references → `correspondence:: [[Planet Name]]`
- Elemental associations → `correspondence:: [[Element Name]]`
- Lunar phase mentions → `correspondence:: [[Moon Phase]]`
- Tradition links → `tradition:: [[Tradition Name]]` (if tradition pages exist)

**And** link generation algorithm:
  1. Scans content for entity names from known entity list
  2. Scans for ritual names from ritual library
  3. Detects correspondence keywords (planets, elements, moon phases)
  4. Creates context-appropriate named relationships
  5. Preserves original text readability

**And** links are bidirectional (backlinks work automatically in Obsidian)
**And** no false positives (e.g., "mars" in "nightmares" shouldn't link to Mars)
**And** duplicate links in same section are deduplicated

**Prerequisites:** Stories 2.1, 2.2

**Technical Notes:** Use exact matching for entity/ritual names. Use keyword dictionary for correspondences with context awareness. Consider word boundaries to avoid false matches.

---

### Story 2.4: Hierarchical Tag Generation System

As a practitioner,
I want automatic hierarchical tags applied to all content,
So that I can filter and organize my vault using Obsidian's tag system and graph filters.

**Acceptance Criteria:**

**Given** rituals, entities, and other content are exported
**When** tags are generated
**Then** the following tag hierarchies are applied:

**Ritual Tags:**
- `#scry/ritual/{type}` - banishing, invocation, meditation, devotional
- `#scry/ritual/{type}/{tradition}` - thelema, hermetic, greek, chaos
- `#scry/planetary/{planet}` - for planetary workings

**Entity Tags:**
- `#scry/entity/{category}` - deity, archetype, spirit, angel, power
- `#scry/entity/{category}/{nature}` - chthonian, celestial, elemental
- `#scry/tradition/{tradition}` - thelema, hermetic, greek

**Correspondence Tags:**
- `#scry/correspondence/{type}` - planetary, elemental, lunar, color, scent

**Journal Tags (for future):**
- `#scry/journal/{type}` - ritual-log, entity-dialogue, insight, dream

**And** tags are added to frontmatter and inline in markdown
**And** tag generation is configurable (user can customize hierarchy)
**And** missing metadata doesn't create broken tags

**Prerequisites:** Stories 2.1, 2.2

**Technical Notes:** Generate tags from Properties metadata. Allow configuration override for custom tag schemas. Consider both frontmatter tags and inline tags based on user preference.

---

### Story 2.5: Correspondence Library Generator

As a practitioner,
I want correspondence notes automatically generated for planets, elements, and lunar phases,
So that I have reference material during ritual planning and can see which rituals use which energies.

**Acceptance Criteria:**

**Given** rituals and entities reference various correspondences
**When** the correspondence library is generated
**Then** notes are created in `vault/Correspondences/{type}/` for:
- **Planetary:** Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto
- **Elemental:** Fire, Water, Air, Earth, Spirit
- **Lunar:** New Moon, Waxing Moon, Full Moon, Waning Moon, Dark Moon

**Each correspondence note contains:**
- Properties: `correspondence_type`, `associated_entities`, `associated_rituals`
- Description of the correspondence (symbolic meaning, timing, qualities)
- Associated colors, scents, symbols (where applicable)
- Backlinks section (automatically populated by Obsidian)
- Rituals that use this correspondence (via Dataview query placeholder)

**And** correspondences are linked from rituals/entities using `correspondence::` links
**And** correspondence notes are generated from a template/data file
**And** library covers all correspondences mentioned in exported rituals

**Prerequisites:** Stories 2.1, 2.2, 2.3

**Technical Notes:** Create correspondence data file (YAML or JSON) with descriptions. Generate notes from template. Consider allowing user additions/customizations to correspondence descriptions.

---

### Story 2.6: File Naming & Folder Structure Manager

As a practitioner,
I want consistent, sensible folder organization and file naming,
So that my vault is organized logically and works well across platforms (desktop/mobile).

**Acceptance Criteria:**

**Given** content is being exported to the vault
**When** files and folders are created
**Then** the following structure is used:

```
vault/
├── Rituals/
│   ├── Banishing/
│   ├── Invocation/
│   ├── Devotional/
│   └── Meditation/
├── Entities/
│   ├── Deities/
│   └── Powers/
├── Correspondences/
│   ├── Planetary/
│   ├── Elemental/
│   └── Lunar/
├── Journal/ (created but empty for MVP)
├── Templates/ (for future stories)
└── Dashboards/ (for future stories)
```

**File naming conventions:**
- Kebab-case: `star-ruby-liber-xxv.md`, `hekate-guide.md`
- No special characters (cross-platform compatibility)
- Descriptive names matching content title
- Collision handling (append number if duplicate)

**And** folder creation is idempotent (safe to re-run)
**And** existing files can be updated or skipped based on configuration
**And** directory structure is configurable via export config

**Prerequisites:** Epic 1 Complete

**Technical Notes:** Use path utilities to ensure cross-platform compatibility. Handle case-insensitive filesystems (macOS/Windows). Provide dry-run mode to preview structure before export.

---

### Story 2.7: Transformation Testing & Validation Suite

As a developer,
I want comprehensive testing of transformation logic against real Scry data,
So that I can trust the export engine produces correct, high-quality Obsidian markdown.

**Acceptance Criteria:**

**Given** transformation logic is implemented (Stories 2.1-2.6)
**When** I run the test suite
**Then** the following are validated:
- All existing Scry rituals export without errors
- All existing Scry entities export with complete data
- Generated markdown is valid and renders correctly
- Properties frontmatter is well-formed YAML
- All links are valid (no broken wikilinks)
- Tag hierarchy follows defined schema
- File naming is consistent and collision-free
- Folder structure matches specification

**Integration tests verify:**
- End-to-end export of full Scry module
- Incremental export (only changed files)
- Re-export doesn't corrupt existing vault
- Generated correspondence library is complete

**And** snapshot tests capture expected output for regression detection
**And** validation reports missing or malformed data with helpful messages
**And** test coverage for transformation logic exceeds 85%

**Prerequisites:** Stories 2.1-2.6

**Technical Notes:** Use actual Scry data for integration tests. Create "golden" snapshots of correctly transformed files. Consider visual diff tools for markdown comparison.

---

## Epic 3: Bi-directional Sync & Data Integrity

**Goal**: Maintain consistency between BMAD source and Obsidian vault in both directions with zero data loss, enabling seamless workflow between Claude Code "agent mode" and Obsidian "vault mode" while preserving offline practice capabilities.

### Story 3.1: BMAD-to-Obsidian Export Mechanism

As a practitioner,
I want to export BMAD changes to Obsidian vault on demand,
So that my vault stays up-to-date with agent-created content and ritual updates.

**Acceptance Criteria:**

**Given** BMAD content has changed (new rituals, updated entities, etc.)
**When** I trigger the export process
**Then** the export:
- Detects all changed files since last export (via timestamp comparison or manifest)
- Transforms changed content using Epic 2 transformers
- Writes to vault with atomic file operations (no partial writes)
- Updates version property on modified files
- Creates export manifest with timestamp and file list
- Completes within 10 seconds for typical library size (~15 files)

**Trigger mechanisms:**
- CLI command: `scry-export` or similar
- Manual invocation from BMAD agent
- Scheduled export (optional, e.g., daily cron job)

**And** export is idempotent (safe to run multiple times)
**And** dry-run mode previews changes without writing
**And** export log reports what was updated/created/skipped
**And** errors don't leave vault in inconsistent state

**Prerequisites:** Epic 2 Complete

**Technical Notes:** Implement change detection via file modification times or checksum-based manifest. Use write-file-atomic for all writes. Consider incremental export vs. full export modes.

---

### Story 3.2: Obsidian-to-BMAD Import Mechanism

As a practitioner,
I want journal entries created in Obsidian to sync back to BMAD,
So that my practice insights are preserved in the structured database.

**Acceptance Criteria:**

**Given** I've created journal entries in `vault/Journal/` on mobile or desktop
**When** I trigger the import process
**Then** the import:
- Detects new/modified files in Journal folder since last import
- Validates file structure (required Properties, valid markdown)
- Parses journal entries into structured format
- Stores in `.bmad/scry/journal/` with original timestamp preserved
- Creates backlinks to referenced rituals/entities in BMAD database
- Updates import manifest with processed files

**Scope limitations (MVP):**
- Only `vault/Journal/` is imported (rituals/entities remain BMAD source of truth)
- Templates folder is ignored
- System folders (`.obsidian/`, `_system/`) are ignored

**And** import handles malformed files gracefully with helpful error messages
**And** import preserves all user-created content (no data loss)
**And** imported files maintain relationship links (entity::, ritual::, etc.)

**Prerequisites:** Epic 2 Complete

**Technical Notes:** Watch vault/Journal/ folder for changes. Validate Properties before import. Store journal entries in date-organized structure. Consider using file watcher (chokidar) for auto-import.

---

### Story 3.3: Conflict Detection & Resolution Strategy

As a practitioner,
I want intelligent conflict detection when the same file is modified in both BMAD and Obsidian,
So that I never lose work due to conflicting edits.

**Acceptance Criteria:**

**Given** the same file has been modified in both BMAD and Obsidian since last sync
**When** sync is triggered
**Then** the conflict detector:
- Compares timestamps between source and vault versions
- Identifies conflicting files (modified in both locations)
- Determines conflict resolution strategy:
  - **Rituals/Entities**: BMAD is source of truth (vault overwritten with warning)
  - **Journal entries**: Newest timestamp wins (with user prompt option)
  - **Critical conflicts**: Halt sync and prompt user for manual resolution

**Conflict resolution options:**
- Auto-resolve with newest-wins strategy (configurable)
- Create conflict copy (e.g., `note-conflict-2025-11-10.md`)
- Prompt user to choose version (interactive mode)
- Abort sync and report conflicts for manual resolution

**And** conflict resolution never silently loses data (always preserve in conflict copy)
**And** conflict log reports all detected conflicts and resolutions
**And** user can configure conflict resolution preferences in config file

**Prerequisites:** Stories 3.1, 3.2

**Technical Notes:** Use file modification timestamps and version properties for conflict detection. Consider three-way merge for advanced scenarios. Always create backup before overwriting.

---

### Story 3.4: Version Tracking & Change History

As a practitioner,
I want version tracking on all exported content,
So that I can roll back changes and understand how content evolves over time.

**Acceptance Criteria:**

**Given** content is exported from BMAD to Obsidian
**When** the same content is exported again with changes
**Then** version tracking:
- Increments `version` property using semantic versioning (1.0 → 1.1 → 2.0)
- Major version bump: structural changes (new sections, removed content)
- Minor version bump: metadata changes, corrections, additions
- Stores version history in export manifest (file, version, timestamp, checksum)
- Optionally maintains version archive (previous versions backed up)

**Version property format:**
```yaml
---
version: 1.2
version_history:
  - version: 1.0
    date: 2025-11-10
    checksum: abc123
  - version: 1.1
    date: 2025-11-11
    checksum: def456
---
```

**And** version rollback command restores previous version from archive
**And** version diff shows what changed between versions
**And** version history is queryable (via Dataview or CLI tool)

**Prerequisites:** Story 3.1

**Technical Notes:** Store version history in export manifest or directly in Properties. Consider git-style checksums for change detection. Optional: integrate with vault's `.obsidian/plugins/obsidian-git/` if user has git plugin.

---

### Story 3.5: Offline Practice Support & Deferred Sync

As a practitioner,
I want the vault to work fully offline during multi-day retreats,
So that I can practice in nature without connectivity and sync changes when I return.

**Acceptance Criteria:**

**Given** I am using Obsidian mobile offline for multiple days
**When** I create journal entries, modify notes, and practice rituals offline
**Then** the offline experience:
- All vault content (rituals, entities, templates) is fully accessible offline
- Journal entries are created and stored locally
- Templates work without network connectivity
- Obsidian mobile operates normally (all plugins function)
- No data loss occurs during offline period

**When** connectivity is restored and sync is triggered
**Then** deferred sync:
- Detects all changes made during offline period (potentially 7+ days)
- Imports all journal entries created offline
- Resolves conflicts if BMAD was also updated during offline period
- Reconciles timestamps and creates conflict copies if needed
- Validates data integrity after sync (no corruption)

**And** sync handles large batches of offline changes efficiently (20+ journal entries)
**And** sync reports summary of changes processed during offline reconciliation
**And** vault remains usable if sync fails (offline changes preserved)

**Prerequisites:** Stories 3.1, 3.2, 3.3

**Technical Notes:** Obsidian naturally supports offline mode. Focus on robust batch import and conflict handling for deferred sync. Test with Obsidian Sync, iCloud, and Dropbox sync services.

---

### Story 3.6: Sync Testing & Data Integrity Validation

As a developer,
I want comprehensive testing of sync scenarios including edge cases,
So that I can guarantee zero data loss under all conditions.

**Acceptance Criteria:**

**Given** sync mechanisms are implemented (Stories 3.1-3.5)
**When** I run the sync test suite
**Then** the following scenarios are validated:

**Export testing:**
- Full export of all BMAD content
- Incremental export (only changed files)
- Re-export without changes (no-op)
- Concurrent export handling (lock mechanism)

**Import testing:**
- Single journal entry import
- Batch import (20+ entries)
- Import with invalid/malformed files
- Import with missing required Properties

**Conflict scenarios:**
- Same file modified in both locations
- File deleted in one location, modified in other
- Timestamp collision (same second modification)
- Manual conflict resolution workflow

**Offline scenarios:**
- 7-day offline period with 20+ journal entries
- Sync after extended offline (conflict reconciliation)
- Partial sync failure and recovery

**Data integrity:**
- Checksum validation before/after sync
- No data loss in any scenario (conflict copies created)
- Atomic operations (no partial writes)
- Graceful handling of filesystem errors

**And** stress testing validates sync with large libraries (100+ files)
**And** cross-platform testing (macOS, Windows, Linux, iOS, Android)
**And** sync service compatibility (Obsidian Sync, iCloud, Dropbox)

**Prerequisites:** Stories 3.1-3.5

**Technical Notes:** Create comprehensive test fixtures for all scenarios. Use filesystem mocking for edge case testing. Test with actual Obsidian mobile to validate real-world behavior.

---

## Epic 4: Obsidian Vault Experience

**Goal**: Create the immersive Obsidian experience with batteries-included templates, dynamic dashboards, and rich visualizations that transform the vault from a file collection into an integrated practice companion.

### Story 4.1: Templater Journal Templates

As a practitioner,
I want context-aware journal templates that auto-populate from current ritual or entity,
So that journaling feels like a natural continuation of practice, not data entry.

**Acceptance Criteria:**

**Given** Templater plugin is installed and configured
**When** I create journal templates in `vault/Templates/`
**Then** the following templates are created:

**Ritual Completion Template** (`ritual-completion.md`):
- Auto-fills ritual name from current note context
- Auto-inserts current date, time, moon phase (user input)
- Creates `ritual::` link to source ritual
- Prompts for: duration, practitioner state, astrological conditions, insights
- Generates filename: `{YYYY-MM-DD}-{ritual-name}.md`
- Files to: `vault/Journal/{YYYY}/{MM}/`

**Entity Conversation Template** (`entity-conversation.md`):
- Auto-fills entity name from current note context
- Creates `entity::` link to source entity
- Prompts for: question type, conversation summary, key guidance
- Structured sections for practical applications
- Tags with `#scry/journal/entity-dialogue`

**Universal Insight Capture Template** (`insight-capture.md`):
- Context-aware (suggests tags based on current note)
- Quick capture with minimal prompts
- Auto-creates relationship links if invoked from ritual/entity
- Flexible tagging system

**And** templates work on mobile Obsidian (iOS/Android)
**And** Templater commands are accessible via command palette
**And** calendar integration auto-organizes journal entries by date
**And** template documentation explains usage for each template

**Prerequisites:** Epic 2 Complete (vault structure exists)

**Technical Notes:** Configure Templater to use `vault/Templates/` folder. Use Templater's `tp.file.cursor()`, `tp.date.now()`, and context variables. Test on mobile to ensure compatibility.

---

### Story 4.2: Ritual Dashboard with Dataview

As a practitioner,
I want a dynamic ritual dashboard that shows my library filtered by various dimensions,
So that I can quickly discover appropriate rituals for current conditions and practice goals.

**Acceptance Criteria:**

**Given** Dataview plugin is installed and ritual library is exported
**When** I open `vault/Dashboards/ritual-dashboard.md`
**Then** the dashboard displays:

**Ritual Library Section:**
- Table view: all rituals with columns (name, type, difficulty, duration, entities, tradition)
- Sortable by any column
- Clickable links to ritual notes

**Filter Views:**
- "Beginner-Friendly Rituals" - difficulty: beginner
- "Quick Practices" - duration ≤ 15 minutes
- "By Tradition" - grouped by tradition (Thelema, Hermetic, etc.)
- "By Entity" - lists rituals grouped by invoked entities
- "By Correspondence" - planetary/elemental groupings

**Search Functionality:**
- Text filter box (Dataview inline query)
- Multi-dimensional filtering (combine difficulty + duration + entity)

**And** dashboard updates automatically when new rituals are exported
**And** queries are performant (< 1 second load time)
**And** dashboard works on mobile (simplified view if needed)
**And** commented query syntax explains how to customize

**Prerequisites:** Stories 2.1, 2.4 (rituals with Properties and tags)

**Technical Notes:** Use Dataview TABLE and LIST queries with FROM and WHERE clauses. Group by Properties fields. Provide query templates users can customize.

---

### Story 4.3: Practice Analytics Dashboard

As a practitioner,
I want analytics on my practice patterns and ritual frequency,
So that I can track consistency, identify trends, and see which practices resonate most.

**Acceptance Criteria:**

**Given** journal entries exist in `vault/Journal/` with ritual and entity links
**When** I open `vault/Dashboards/practice-analytics.md`
**Then** the dashboard displays:

**Practice Frequency:**
- Total journal entries (count by month)
- Rituals practiced (ranked by frequency)
- Entities consulted (ranked by frequency)
- Calendar heatmap (Dataview with date grouping)

**Tradition & Type Patterns:**
- Breakdown by ritual type (banishing, invocation, etc.)
- Tradition distribution (which traditions am I drawn to?)
- Planetary influence patterns (which planetary energies am I working with?)

**Effectiveness Tracking:**
- If journal entries include effectiveness rating (1-5), show averages
- Top-rated rituals
- Insights correlation (rituals that generate most insights)

**Recent Activity:**
- Last 7 days of practice
- Last 30 days summary
- Longest practice streak

**And** analytics update in real-time as journal entries are added
**And** dashboard is interactive (click ritual to see all related journal entries)
**And** visualizations are mobile-friendly
**And** privacy-conscious (no external data sharing)

**Prerequisites:** Stories 3.2 (journal import), 4.1 (journal templates)

**Technical Notes:** Use Dataview GROUP BY and aggregation functions (count, list). Consider simple ASCII charts or emoji-based visualizations for mobile compatibility.

---

### Story 4.4: Entity Index with Dynamic Backlinks

As a practitioner,
I want an entity index that shows all relationships and ritual associations,
So that I can explore entity networks and see which rituals invoke which entities.

**Acceptance Criteria:**

**Given** entities are exported with Properties and rituals contain entity links
**When** I open `vault/Dashboards/entity-index.md`
**Then** the dashboard displays:

**Entity Directory:**
- Table view: all entities with columns (name, type, domains, planets, tradition)
- Grouped by entity type (Deities, Powers, Archetypes, etc.)
- Clickable links to full entity profiles

**Relationship Visualization:**
- For each entity: list of rituals that invoke them
- Entity hierarchy (if applicable)
- Related entities (entities that share correspondence patterns)
- Traditions associated with each entity

**Entity Profiles Enhanced:**
- Each entity note shows automatic backlinks section
- Dataview query: "Rituals invoking [[this entity]]"
- Journal entries mentioning this entity
- Correspondence overlap with other entities

**And** index updates automatically when entities are added/modified
**And** relationship queries are bidirectional (entity → rituals, ritual → entities)
**And** mobile-optimized layout

**Prerequisites:** Stories 2.2, 2.3 (entity export with links)

**Technical Notes:** Use Dataview to query backlinks and `entity::` relationships. Create reusable query snippets for entity profile sections.

---

### Story 4.5: Graph View Optimization & Custom CSS

As a practitioner,
I want the graph view optimized with color-coded nodes and clean styling,
So that I can visually explore practice connections and identify patterns at a glance.

**Acceptance Criteria:**

**Given** vault contains rituals, entities, correspondences, and journal entries
**When** I open Obsidian graph view
**Then** visual customization includes:

**Node Coloring (via CSS snippets):**
- Rituals: Blue (#4A9EFF)
- Entities: Purple (#A78BFA)
- Correspondences: Orange (#FB923C)
- Journal Entries: Green (#4ADE80)
- Templates/Dashboards: Gray (low opacity)

**Graph Filters:**
- Pre-configured filter groups:
  - "Practice Core" (rituals + entities only)
  - "Full Practice Network" (all content types)
  - "Planetary" (correspondences + related rituals)
  - "By Tradition" (filter by tradition tag)

**Edge Styling:**
- Named relationships visible (entity::, prerequisite::, correspondence::)
- Thicker lines for frequently used connections
- Prerequisite relationships use directional arrows

**Graph Settings:**
- Optimized force layout (good spacing, readable labels)
- Zoom presets for overview vs. detail exploration
- Center on currently open note

**And** CSS snippet installed in `.obsidian/snippets/scry-graph-colors.css`
**And** graph settings exported as JSON (user can import)
**And** works on desktop (mobile graph view is basic)

**Prerequisites:** Epic 2 Complete (content with tags and links)

**Technical Notes:** Use Obsidian CSS variables for graph node colors. Create graph filter templates users can import. Document how to customize colors.

---

### Story 4.6: ExcaliBrain Semantic Visualization

As a practitioner,
I want ExcaliBrain configured to show semantic relationships as labeled edges,
So that I can visualize ritual dependencies, entity hierarchies, and correspondence networks.

**Acceptance Criteria:**

**Given** ExcaliBrain plugin is installed
**When** I configure ExcaliBrain settings for Scry vault
**Then** the following relationships are visualized:

**Relationship Types Configured:**
- `entity::` - shows which entities are invoked
- `prerequisite::` - shows ritual dependency chains
- `correspondence::` - shows planetary/elemental associations
- `tradition::` - links to tradition context notes

**Visualization Modes:**
- **Ritual view**: Shows prerequisites (left), entities invoked (right), correspondences (bottom)
- **Entity view**: Shows related rituals (right), correspondence attributes (bottom), tradition (top)
- **Correspondence view**: Shows rituals using this energy, related entities

**Layout & Styling:**
- Clean, readable layout with non-overlapping nodes
- Labeled edges (relationship type visible)
- Color-coding consistent with graph view
- Hierarchical arrangement (prerequisites flow logically)

**And** ExcaliBrain settings exported as JSON configuration
**And** documentation explains how to navigate ExcaliBrain for Scry content
**And** works on desktop (ExcaliBrain is desktop-only plugin)

**Prerequisites:** Stories 2.3 (named relationships), 4.5 (graph optimization)

**Technical Notes:** Configure ExcaliBrain's relationship settings to recognize custom types (entity::, prerequisite::, etc.). Create example screenshots for documentation.

---

### Story 4.7: Canvas Ritual Planning Boards

As a practitioner,
I want Canvas boards for visual ritual planning and multi-day working design,
So that I can design complex ritual sequences and see energy flow visually.

**Acceptance Criteria:**

**Given** Obsidian Canvas core plugin is enabled
**When** I create ritual planning canvases
**Then** the following canvas templates are available:

**Canvas Template 1: Ritual Sequence Builder**
- Purpose: Plan multi-ritual workings (e.g., week-long operation)
- Layout: Horizontal timeline with ritual cards
- Cards contain: ritual link, timing notes, astrological context
- Arrows show energy flow and dependencies

**Canvas Template 2: Entity Relationship Map**
- Purpose: Visualize entity hierarchies and relationships
- Layout: Hierarchical tree or network diagram
- Cards: Entity profiles with key correspondences
- Connections: Mythological relationships, shared domains

**Canvas Template 3: Correspondence Network**
- Purpose: Map planetary/elemental correspondences across rituals
- Layout: Radial design with correspondences at center
- Ritual cards arranged around relevant correspondences
- Visual grouping by tradition or practice goal

**And** canvas templates stored in `vault/Templates/Canvases/`
**And** documentation explains how to use each canvas type
**And** canvases work on mobile (limited editing, full viewing)

**Prerequisites:** Epic 2 Complete (rituals and entities exported)

**Technical Notes:** Create canvas files (.canvas JSON format) with example layouts. Provide drag-and-drop workflow instructions. Canvas sync works via standard vault sync.

---

### Story 4.8: Plugin Setup & Configuration Documentation

As a practitioner,
I want comprehensive documentation for setting up all required Obsidian plugins,
So that I can configure the vault correctly and understand how each plugin enhances practice.

**Acceptance Criteria:**

**Given** the Scry Obsidian integration requires specific plugins
**When** I read `vault/_system/SETUP-GUIDE.md`
**Then** the documentation includes:

**Required Plugins (Core MVP):**
- **Dataview**: Installation, enabling JS queries, sample queries
- **Templater**: Installation, template folder configuration, sample usage
- **Calendar**: Installation, journal folder configuration

**Enhanced Experience Plugins:**
- **ExcaliBrain**: Installation, relationship configuration, usage guide
- **Obsidian Git** (optional): Version control integration
- **Advanced Tables** (optional): Better table editing for correspondence notes

**Configuration Walkthroughs:**
- Step-by-step setup for each plugin (with screenshots)
- Recommended settings for Scry vault
- Mobile vs. desktop plugin availability notes
- Troubleshooting common issues

**Sync Service Setup:**
- Obsidian Sync configuration
- iCloud Drive setup (iOS/macOS)
- Dropbox setup (cross-platform)

**Best Practices:**
- Plugin update recommendations
- Performance optimization
- Mobile-specific tips
- Privacy and security considerations

**And** setup guide is beginner-friendly (assumes no Obsidian experience)
**And** includes links to official plugin documentation
**And** checklist format for easy validation ("Did you...?")

**Prerequisites:** Epic 2 Complete (vault exists)

**Technical Notes:** Create markdown guide with clear sections. Include plugin version numbers tested. Maintain in vault for easy access.

---

## Epic 5: Mobile Optimization & Real-World Validation

**Goal**: Deliver the core product magic - seamless mobile ritual practice flow - by validating that the entire system enables practitioners to access rituals, perform practice, and journal insights on mobile without friction, fulfilling the "mobile ritual magic" promise.

### Story 5.1: Mobile Formatting Validation & Optimization

As a practitioner,
I want all ritual content formatted perfectly for mobile reading,
So that I can follow instructions comfortably during practice without zooming, scrolling horizontally, or struggling with layout.

**Acceptance Criteria:**

**Given** rituals are exported to the vault
**When** I view ritual notes on mobile Obsidian (iOS/Android)
**Then** mobile formatting validation confirms:

**Readability:**
- No horizontal scrolling required (all content fits screen width)
- Text is readable at default zoom (no need to pinch-zoom)
- Headings are clearly distinguished
- Lists and numbered steps are easy to follow
- Code blocks (if any) wrap appropriately

**Layout Issues Fixed:**
- Long ritual names don't break layout
- Tables are mobile-responsive (or converted to lists)
- Properties frontmatter displays cleanly
- Links are tappable (not too small)
- Nested content has appropriate indentation

**Visual Hierarchy:**
- Section breaks are clear
- Important instructions stand out
- Ritual timing/duration visible at glance
- Entity names and correspondences are scannable

**Testing Coverage:**
- All 9+ exported rituals tested on both iOS and Android
- Various screen sizes tested (small phone, tablet)
- Both light and dark themes validated

**And** formatting issues documented with screenshots
**And** export engine adjustments made if needed (line length limits, table conversions)
**And** mobile-specific CSS (if needed) added to vault

**Prerequisites:** Epic 2 Complete (rituals exported)

**Technical Notes:** Test on actual devices, not just browser emulation. Consider Obsidian mobile rendering differences. Document any markdown patterns that don't render well mobile.

---

### Story 5.2: Touch Interaction & Template Accessibility

As a practitioner,
I want template insertion and navigation to be effortless on mobile,
So that I can journal immediately after ritual without fumbling with UI.

**Acceptance Criteria:**

**Given** I've completed a ritual and want to journal on mobile
**When** I test the mobile journaling workflow
**Then** touch interaction validation confirms:

**Template Accessibility:**
- Templates accessible via Templater mobile command palette
- Command palette opens with single tap (no hidden menus)
- Template selection with large, tappable options
- Most-used templates pinned/starred for quick access

**Template Execution:**
- Templates execute immediately after selection
- Cursor positioned correctly for immediate typing
- Auto-populated fields (date, ritual name) fill correctly
- File creation happens without manual navigation

**Touch Target Sizes:**
- All interactive elements ≥ 44px touch target (iOS guidelines)
- Link tapping doesn't accidentally hit wrong target
- Tag selection (if applicable) is touch-friendly
- Button spacing prevents fat-finger errors

**Keyboard Integration:**
- Mobile keyboard appears immediately when template inserted
- Keyboard doesn't obscure input fields
- Autocomplete suggestions work for entity/ritual names
- Return/Enter key behavior is intuitive

**User Flow Timing:**
- From ritual completion → template inserted → ready to type: < 10 seconds
- No app switching required
- No confusing navigation steps

**And** mobile workflow documented with screen recordings or screenshots
**And** any friction points identified and resolved
**And** works on both iOS and Android Obsidian apps

**Prerequisites:** Story 4.1 (journal templates created)

**Technical Notes:** Test with real practice scenarios. Time the workflow. Use mobile-specific Templater syntax if needed. Consider iOS vs. Android keyboard differences.

---

### Story 5.3: Cross-Platform Sync Testing & Validation

As a practitioner,
I want seamless sync between desktop (Claude Code) and mobile (Obsidian vault),
So that I can work in agent mode at my desk and practice mode on my phone without manual intervention.

**Acceptance Criteria:**

**Given** vault is synced via iCloud, Dropbox, or Obsidian Sync
**When** I test cross-platform workflows
**Then** sync validation confirms:

**Desktop → Mobile (Export Flow):**
- Export ritual from BMAD on desktop
- Wait for sync (< 30 seconds typical)
- Verify ritual appears in mobile Obsidian
- Verify all Properties, links, and formatting intact
- Repeat with entity export, correspondence updates

**Mobile → Desktop (Journal Import):**
- Create journal entry on mobile Obsidian
- Wait for sync
- Trigger import on desktop BMAD
- Verify journal entry imported correctly
- Verify relationship links preserved

**Sync Service Testing:**
- **Obsidian Sync**: End-to-end workflow, conflict handling
- **iCloud Drive**: iOS/macOS workflow, sync timing
- **Dropbox**: Cross-platform workflow (iOS/Android/desktop)

**Offline-to-Online Reconciliation:**
- Practice offline for 2-3 days (create 5+ journal entries)
- Restore connectivity
- Verify all offline changes sync correctly
- Verify no data loss or corruption
- Test conflict scenarios (desktop + mobile both modified)

**Sync Reliability:**
- 20+ consecutive sync cycles without data loss
- Large file changes (ritual with extensive notes) sync correctly
- Rapid changes (multiple edits in quick succession) handled gracefully

**And** sync service setup documented for each platform
**And** common sync issues and solutions documented
**And** sync timing benchmarks recorded (typical: X seconds, max: Y seconds)

**Prerequisites:** Epic 3 Complete (sync mechanisms), Epic 4 Complete (templates)

**Technical Notes:** Test real-world sync services, not mocks. Document sync service-specific quirks. Include bandwidth considerations (cellular vs. WiFi).

---

### Story 5.4: End-to-End Ritual Practice Validation

As a practitioner,
I want to validate the complete mobile ritual practice flow in real-world conditions,
So that I can confirm the system delivers on the "mobile ritual magic" promise.

**Acceptance Criteria:**

**Given** the Scry Obsidian integration is complete (Epics 1-4)
**When** I perform end-to-end practice validation
**Then** the following real-world scenario succeeds:

**Scenario: Complete Ritual Practice Flow on Mobile**

1. **Discovery Phase:**
   - Open mobile Obsidian vault
   - Navigate to Ritual Dashboard
   - Filter rituals by difficulty: beginner
   - Select ritual: "LBRP" (or similar)
   - Time to ritual instructions: < 30 seconds

2. **Practice Phase:**
   - Read ritual instructions on phone during performance
   - Readability is excellent (no squinting, no layout issues)
   - Follow multi-step instructions without switching apps
   - Use phone in low-light conditions (dim ritual space)
   - No interruptions from notifications or app crashes

3. **Journal Phase:**
   - Immediately after ritual, open Templater
   - Insert "Ritual Completion" template
   - Template auto-fills ritual name from current context
   - Journal experience, duration, insights
   - Add astrological notes (moon phase, planetary day)
   - Save journal entry to date-organized folder
   - Total time to journal: < 2 minutes

4. **Sync & Verification:**
   - Return to desktop/laptop
   - Trigger BMAD import
   - Verify journal entry appears in `.bmad/scry/journal/`
   - Verify relationship links (ritual, entities) are intact
   - View practice analytics dashboard (updated with new entry)

**Success Criteria:**
- Zero friction points that break immersion
- No technical knowledge required during practice
- Workflow feels natural and supports sacred space
- All data preserved and accessible in both environments

**Real-World Conditions Tested:**
- Low cellular connectivity (3G or worse)
- Dim lighting (candle-lit ritual space)
- Interruptions (phone call during practice, handle gracefully)
- Extended offline period (practice in nature, no signal)

**Additional Validation Scenarios:**
- Entity consultation workflow (navigate to entity, read profile, journal insights)
- Correspondence lookup during ritual planning
- Graph view exploration (discover ritual connections visually)
- Multi-day working (plan sequence, execute over days, track progress)

**And** validation performed by actual practitioner (not just developer testing)
**And** feedback collected: "What felt magical? What felt clunky?"
**And** any identified issues prioritized for post-MVP refinement
**And** success metrics measured:
  - Ritual lookup time: target < 30s (actual: ?)
  - Journal capture time: target < 2min (actual: ?)
  - Practitioner satisfaction: target "would use regularly"
  - Mobile ritual practice frequency increase: baseline → post-integration

**Prerequisites:** Epic 1-4 Complete (entire system functional)

**Technical Notes:** This is the ultimate validation - does the system deliver the core promise? Document real practitioner experience. Video record workflow for documentation. Identify any "last 10%" polish needed.

---

## Implementation Summary

### Epic Overview

| Epic | Stories | Focus | Value Delivered |
|------|---------|-------|-----------------|
| **Epic 1: Export Engine Foundation** | 5 | Infrastructure setup, file operations, configuration | Technical foundation that powers all transformation |
| **Epic 2: Content Transformation** | 7 | Ritual/entity export, link generation, tags, testing | Core content intelligence - making connections explicit |
| **Epic 3: Bi-directional Sync** | 6 | Export/import mechanisms, conflict resolution, offline support | Zero data loss sync between BMAD and Obsidian |
| **Epic 4: Obsidian Vault Experience** | 8 | Templates, dashboards, visualizations, plugin setup | Immersive practice companion interface |
| **Epic 5: Mobile Optimization** | 4 | Mobile formatting, touch interaction, sync testing, real-world validation | **Mobile ritual magic** - the core product promise |
| **TOTAL** | **30** | **Complete MVP** | **Ultimate digital book of shadows** |

### Development Sequence

The epic sequence is designed for **maximum value delivery with zero forward dependencies**:

1. **Epic 1** establishes foundation (required first)
2. **Epic 2** builds content transformation (depends on Epic 1)
3. **Epic 3** adds synchronization (depends on having content to sync)
4. **Epic 4** creates vault experience (enhances transformed content)
5. **Epic 5** validates mobile promise (tests entire integrated system)

Each epic can be completed and validated independently before moving to the next.

### Story Sizing & Implementation Notes

**Story Size Target**: Single-session completion for dev agent (4-6 hours focused work)

**Stories that may be larger** (consider splitting if needed):
- Story 2.3: Named Relationship Link Generation (complex algorithm)
- Story 3.3: Conflict Detection & Resolution (many edge cases)
- Story 4.2: Ritual Dashboard with Dataview (many query variations)
- Story 5.4: End-to-End Validation (comprehensive testing)

**Stories that may be smaller** (could combine):
- Story 1.5 + Story 2.7: Testing stories could be integrated
- Story 4.5 + Story 4.6: Graph and ExcaliBrain visualization could combine

### Technology Stack

**Languages & Core Tools:**
- TypeScript/Node.js for export engine
- YAML/Markdown for content format
- Obsidian (desktop + mobile)

**Dependencies:**
- `js-yaml` - YAML parsing
- `gray-matter` - Frontmatter parsing
- `remark` or `markdown-it` - Markdown processing
- `write-file-atomic` - Safe file operations
- `chokidar` - File watching (optional)
- Jest/Vitest - Testing framework

**Obsidian Plugins (User-Installed):**
- **Required**: Dataview, Templater, Calendar
- **Enhanced**: ExcaliBrain, Canvas (core)
- **Optional**: Obsidian Git, Advanced Tables

### Success Metrics (from PRD)

**Primary Success Indicators:**
1. **Mobile ritual practice flow** - End-to-end works seamlessly (Story 5.4 validates)
2. **Discovery of hidden connections** - Graph view reveals unexpected patterns
3. **70% reduction in ritual lookup time** - Measure baseline vs. post-integration
4. **Increased practice integration frequency** - More journal entries due to easier capture

**Technical Success:**
- Zero data loss during sync operations (Story 3.6 validates)
- Export completes < 10 seconds (Story 3.1 validates)
- Mobile load time < 2 seconds (Story 5.1 validates)
- Offline resilience (7+ days tested in Story 3.5)

### Next Steps

**After Epic Breakdown Approval:**

1. **Run Architecture Workflow** (Recommended):
   ```
   /bmad:bmm:workflows:architecture
   ```
   - Define export engine architecture
   - Plan sync mechanism design
   - Document plugin integration patterns
   - Make technical decisions (libraries, patterns, etc.)

2. **Begin Epic 1 Implementation**:
   - Start with Story 1.1: Project Setup
   - Follow BDD acceptance criteria
   - Validate each story before moving to next
   - Use `/bmad:bmm:workflows:dev-story` for story execution

3. **Establish Development Workflow**:
   - Create repository structure
   - Set up CI/CD for testing
   - Document development conventions
   - Plan sprint cadence if desired

### Risk Considerations

**Technical Risks:**
- **Obsidian mobile plugin compatibility** - Some plugins don't work on mobile (mitigated: testing in Story 5.2)
- **Sync service variability** - iCloud/Dropbox behavior differences (mitigated: testing in Story 5.3)
- **Markdown rendering differences** - Desktop vs. mobile (mitigated: validation in Story 5.1)

**Scope Risks:**
- **Feature creep** - Stick to MVP scope, defer advanced features to post-MVP
- **Plugin dependency** - Obsidian plugins evolve, may break (mitigated: version documentation in Story 4.8)
- **Performance with scale** - Test with realistic vault sizes (mitigated: stress testing in Stories 2.7, 3.6)

**User Experience Risks:**
- **Learning curve** - Obsidian setup may be complex for non-technical users (mitigated: comprehensive setup guide in Story 4.8)
- **Mobile UX friction** - Small issues compound during practice (mitigated: real-world validation in Story 5.4)

### Post-MVP Future Vision

**Features deferred to post-MVP** (from PRD):
- Real-time synchronization (batch sync sufficient for MVP)
- Advanced ritual builders or automated generation
- Native Obsidian plugin development (using ecosystem for MVP)
- Multi-user collaboration
- AI-powered insight discovery
- Advanced astrological calculation API integration

---

## Final Notes

This epic breakdown transforms the Scry Obsidian Integration PRD into **30 implementable stories** organized in **5 logical epics**. Each story is:
- **Vertically sliced** - Delivers complete functionality, not just one layer
- **Sequentially ordered** - No forward dependencies within epics
- **BDD-formatted** - Clear Given/When/Then acceptance criteria
- **Single-session sized** - Completable by dev agent in focused session
- **Value-focused** - Each story delivers user or technical value

The epic sequence ensures steady progress toward the **mobile ritual magic** promise: seamless ability to follow ritual instructions and journal insights on mobile without breaking sacred space.

---

*Ready for implementation. Proceed with architecture workflow or begin Epic 1 development.*

