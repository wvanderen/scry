# Architecture Document

## Executive Summary

The Scry Obsidian Integration architecture establishes a modular TypeScript CLI tool that transforms BMAD ritual and entity data into Obsidian-optimized markdown with intelligent relationship mapping and bi-directional sync capabilities. The system enables the "mobile ritual magic" experience through careful separation of concerns, atomic file operations, and progressive enhancement patterns that work across platforms while leveraging Obsidian's full ecosystem when available.

## Project Initialization

First implementation story should execute:
```bash
npx degit kucherenko/cli-typescript-starter scry-obsidian-export
cd scry-obsidian-export
npm install
```

This establishes the base architecture with TypeScript, automated testing, ESLint, Prettier, conventional commits, and semantic release automation.

## Decision Summary

| Category | Decision | Version | Affects Epics | Rationale |
|----------|----------|---------|---------------|-----------|
| **Template** | cli-typescript-starter | v1.x | All | Provides automated publishing, code quality, TypeScript setup |
| **Architecture** | Modular Transformers | - | 1-2 | Clear separation, prevents agent conflicts, testable units |
| **Parsing** | gray-matter | v4.0.3 | 1-2 | Simple API, handles YAML frontmatter + markdown body, battle-tested |
| **File Operations** | write-file-atomic + chokidar + fast-glob | v6.0.0, v4.0.3, v3.3.3 | 1-3 | Industry standard, ensures zero data loss, cross-platform |
| **Link Generation** | Two-Pass Algorithm | - | 2 | Prevents false positives, handles different content types appropriately |
| **Configuration** | Hybrid (defaults + .scryrc.yaml) | - | 1 | Works out-of-box, customizable, maintains BMAD conventions |
| **Validation** | Zod | v4.1.12 | All | TypeScript-first with automatic type inference, excellent performance |
| **Sync Strategy** | Manual CLI (MVP) → Auto-Watch (Future) | - | 3 | Start simple, offline-friendly, enhanced experience later |
| **Obsidian Integration** | Multi-Level Properties | - | 2-4 | Progressive enhancement, portable, supports all plugin features |

## Project Structure

```
scry-obsidian-export/
├── src/                          # TypeScript source
│   ├── cli.ts                    # CLI entry point (from starter)
│   ├── config/
│   │   ├── index.ts              # Config loading logic
│   │   ├── defaults.ts           # Default configuration
│   │   └── schema.ts             # Zod validation schema
│   ├── transformers/             # Modular transformers
│   │   ├── index.ts              # Export orchestrator
│   │   ├── RitualTransformer.ts   # Ritual transformation
│   │   ├── EntityTransformer.ts  # Entity transformation
│   │   ├── LinkGenerator.ts      # Named relationship generation
│   │   ├── TagGenerator.ts       # Hierarchical tag creation
│   │   └── CorrespondenceGenerator.ts # Correspondence library
│   ├── sync/                     # Sync mechanism
│   │   ├── ExportEngine.ts       # BMAD → Obsidian export
│   │   ├── ImportEngine.ts       # Obsidian → BMAD import
│   │   ├── ConflictResolver.ts   # Sync conflict handling
│   │   └── VersionTracker.ts     # Version tracking and history
│   ├── utils/                    # Shared utilities
│   │   ├── FileSystem.ts         # Safe file operations
│   │   ├── Parser.ts             # gray-matter wrapper
│   │   └── Validator.ts          # Zod validation utilities
│   └── types/                    # TypeScript types
│       ├── Ritual.ts             # Generated from Zod schemas
│       ├── Entity.ts
│       ├── Config.ts
│       └── VaultStructure.ts
├── test/                         # Test framework (from starter)
│   ├── fixtures/                 # Sample BMAD files
│   │   ├── rituals/              # Sample ritual files
│   │   ├── entities/             # Sample entity files
│   │   └── expected-output/      # Expected transformed output
│   ├── unit/                     # Unit tests
│   ├── integration/              # End-to-end tests
│   └── __mocks__/                # Test utilities
├── templates/                    # Obsidian templates for setup
│   ├── Templates/                # Journal templates
│   │   ├── ritual-completion.md
│   │   └── entity-conversation.md
│   └── Dashboards/               # Dataview dashboards
│       ├── ritual-dashboard.md
│       └── entity-index.md
├── docs/                         # Documentation
│   ├── README.md
│   ├── ARCHITECTURE.md           # This document
│   └── SETUP-GUIDE.md            # Obsidian plugin setup
├── .scryrc.yaml                  # Default configuration
├── package.json                  # Dependencies and scripts
└── tsconfig.json                 # TypeScript configuration
```

## Epic to Architecture Mapping

| Epic | Core Dependencies | Primary Modules | Integration Points |
|------|------------------|----------------|-------------------|
| **Epic 1: Export Engine Foundation** | gray-matter, write-file-atomic, fast-glob, Zod | `config/`, `utils/FileSystem`, `utils/Parser` | Sets up foundation for all later epics |
| **Epic 2: Content Transformation** | gray-matter, link detection | `transformers/`, `utils/Validator` | Produces markdown for Obsidian integration |
| **Epic 3: Bi-directional Sync** | chokidar, write-file-atomic, Zod | `sync/` | Connects to Epic 2 output, Epic 4 vault |
| **Epic 4: Obsidian Vault Experience** | No runtime dependencies | `templates/`, documentation | Uses Epic 2 output, configures Obsidian |
| **Epic 5: Mobile Optimization** | No runtime dependencies | Cross-platform testing | Validates integration of all previous epics |

## Technology Stack Details

### Core Technologies

**Language & Runtime**
- **TypeScript**: v5.x (via cli-typescript-starter)
- **Node.js**: v20+ (required by starter template)

**Build & Development**
- **TypeScript Compiler**: For strict type checking and ES2022 target
- **ESLint + Prettier**: Code quality and formatting (configured by starter)
- **Jest**: Testing framework (configured by starter)
- **Husky**: Git hooks for pre-commit quality checks (configured by starter)
- **Semantic-release**: Automated versioning and publishing (configured by starter)

**CLI Framework**
- **Yargs**: Command-line argument parsing (included in starter)
- **Signale**: Elegant console output (included in starter)
- **Commitizen**: Conventional commit workflow (included in starter)

### Processing Libraries

**Parsing & Data Handling**
- **gray-matter v4.0.3**: YAML frontmatter + markdown body parsing
  - Handles mixed YAML/markdown files common in BMAD
  - Battle-tested with 2.4M weekly downloads (Gatsby, Astro, TinaCMS)
- **Zod v4.1.12**: Schema validation and TypeScript type inference
  - 14x faster performance in v4.0.0
  - TypeScript-first approach eliminates manual type definitions
- **fast-glob v3.3.3**: Fast file pattern matching
  - Efficient discovery of ritual and entity files
  - Recently updated (Jan 2025) with active maintenance

**File System Operations**
- **write-file-atomic v6.0.0**: Atomic file writing operations
  - Prevents data corruption during writes (NFR-R1 compliance)
  - Essential for maintaining data integrity during sync operations
- **chokidar v4.0.3**: Cross-platform file watching
  - Reduced dependencies to 1 in v4.0.0
  - Reliable file system events across macOS, Windows, Linux
  - ESM support with Node.js 14+ compatibility

### Integration Points

**Obsidian Ecosystem**
- **Properties Format**: Standard YAML frontmatter with multi-level structure
- **Wikilink Format**: `[[Page Name]]` and named relationships `type:: [[Target]]`
- **Plugin Dependencies**: Dataview (queries), Templater (templates), Calendar (journaling)
- **Folder Structure**: Organized by content type with kebab-case naming

**BMAD Module Integration**
- **Source Paths**: `.bmad/scry/scry-knowledge/rituals/`, `.bmad/scry/entities/`
- **Config Integration**: Loads from `.bmad/bmm/config.yaml` or `.bmad/scry/config.yaml`
- **File Formats**: YAML files (agent.yaml) and markdown files with frontmatter

## Implementation Patterns

These patterns ensure consistent implementation across all AI agents:

### Naming Patterns
- **Files**: PascalCase with descriptive suffixes (`RitualTransformer.ts`)
- **Functions**: camelCase with action verbs (`transformRitual`, `generateLinks`)
- **Variables**: camelCase in code, snake_case for YAML external format
- **Types**: PascalCase interface definitions from Zod schemas

### Structure Patterns
- **Single Responsibility**: Each class handles one specific content type
- **Dependency Injection**: Transformers receive dependencies, don't create them
- **Error Handling**: Consistent ScryError hierarchy with contextual messages
- **Module Exports**: Clear, consistent export patterns with re-exported types

### Format Patterns
- **CLI Output**: Standardized success/error response format
- **Error Messages**: Contextual format with file paths and specific details
- **Configuration**: Hybrid approach with code defaults + optional YAML overrides

### Communication Patterns
- **Async/Await**: Consistent asynchronous operation handling
- **Event Pattern**: Clear sync event interface for file change notifications
- **Result Types**: Explicit success/failure result objects

### Lifecycle Patterns
- **Transform Pipeline**: Discovery → Validation → Transform → Atomic Write
- **Sync State**: Clear state tracking with conflict detection
- **Resource Management**: Proper cleanup of file watchers and temporary files

### Location Patterns
- **Path Resolution**: Single PathResolver class for all file path operations
- **Wikilink Generation**: Consistent format for different relationship types
- **Vault Structure**: Standardized folder organization and file naming

### Consistency Patterns
- **Date Formatting**: Single source of truth for all date formats (ISO, display, filename)
- **Logging Strategy**: Signale logger with consistent scope and message formats
- **Validation**: Zod schemas for all external data (config, BMAD files, output)

## Data Architecture

### Core Data Models

**Ritual Structure**
```typescript
interface Ritual {
  ritual_type: "banishing" | "invocation" | "devotional" | "meditation";
  title: string;
  duration: number; // minutes
  difficulty: "beginner" | "intermediate" | "advanced";
  entities: string[];
  correspondences: string[];
  prerequisites: string[];
  tradition: string;
  source?: string;
  content: string; // markdown body
  tags: string[];
}
```

**Entity Structure**
```typescript
interface Entity {
  name: string;
  entity_type: "deity" | "archetype" | "spirit" | "angel" | "power";
  domains: string[];
  planets: string[];
  elements: string[];
  colors: string[];
  offerings: string[];
  correspondences: string[];
  tradition: string;
  description: string; // converted from agent persona
  knowledge: string[]; // sidecar knowledge file content
  tags: string[];
}
```

**Configuration Structure**
```typescript
interface Config {
  vault_path: string;
  source_paths: {
    rituals: string;
    entities: string;
    knowledge: string;
  };
  export_options: {
    overwrite: boolean;
    backup_enabled: boolean;
  };
  sync: {
    mode: "manual" | "auto";
    conflict_resolution: "newest" | "manual" | "bmad_source";
  };
  tag_hierarchy: {
    ritual: string;
    entity: string;
    correspondence: string;
  };
}
```

### Data Flow Architecture

**Export Pipeline (BMAD → Obsidian)**
```
BMAD Files → Discovery → Validation → Transformation → Link Generation → Tag Application → Atomic Write → Obsidian Files
```

**Import Pipeline (Obsidian → BMAD)**
```
Obsidian Journal → Discovery → Validation → Relationship Extraction → Structured Storage → BMAD Journal
```

**Sync State Management**
```
File System Events → Change Detection → Conflict Resolution → Version Tracking → Bidirectional Sync
```

## API Contracts

### CLI Command Interface

**Export Command**
```bash
scry export [options]
Options:
  --vault-path <path>     Override configured vault path
  --dry-run              Preview changes without writing
  --force                Overwrite existing files
  --verbose              Detailed output
```

**Import Command**
```bash
scry import [options]
Options:
  --journal-path <path>  Override journal folder path
  --dry-run              Preview changes without writing
  --conflict <strategy>  Override conflict resolution strategy
```

**Sync Command**
```bash
scry sync [options]
Options:
  --export               Run export only
  --import               Run import only
  --verify               Verify consistency after sync
```

### Module Interfaces

**Transformer Interface**
```typescript
interface Transformer<T, R> {
  validate(input: T): Promise<T>;
  transform(input: T): Promise<R>;
  validateOutput(output: R): Promise<R>;
}
```

**Sync Engine Interface**
```typescript
interface SyncEngine {
  export(): Promise<SyncResult>;
  import(): Promise<SyncResult>;
  resolveConflicts(conflicts: SyncConflict[]): Promise<ConflictResolution[]>;
  trackVersions(files: FileInfo[]): Promise<void>;
}
```

### Configuration Schema

**Zod Validation Schema**
```typescript
const ConfigSchema = z.object({
  vault_path: z.string().min(1, "Vault path is required"),
  source_paths: z.object({
    rituals: z.string().min(1),
    entities: z.string().min(1),
    knowledge: z.string().optional(),
  }),
  export_options: z.object({
    overwrite: z.boolean().default(false),
    backup_enabled: z.boolean().default(true),
  }),
  sync: z.object({
    mode: z.enum(["manual", "auto"]).default("manual"),
    conflict_resolution: z.enum(["newest", "manual", "bmad_source"]).default("newest"),
  }),
  tag_hierarchy: z.object({
    ritual: z.string().default("scry/ritual"),
    entity: z.string().default("scry/entity"),
    correspondence: z.string().default("scry/correspondence"),
  }),
});
```

## Security Architecture

### Data Protection

**File System Security**
- Atomic writes prevent partial file corruption (write-file-atomic)
- Backup creation before overwriting existing files
- Permission validation before file operations
- Safe path resolution to prevent directory traversal attacks

**Input Validation**
- Zod schema validation for all external inputs (configuration, BMAD files)
- File type validation to ensure only markdown/YAML files are processed
- Path sanitization to prevent filesystem injection attacks
- Size limits for processed files to prevent resource exhaustion

**Privacy Considerations**
- Local-only operations, no external API calls during normal use
- Optional flagging of sensitive content in journal entries
- Secure temporary file handling with automatic cleanup
- No credential storage or transmission

### Error Handling Strategy

**Graceful Degradation**
- Parse failures don't corrupt vault, log warnings and continue
- Missing optional fields use sensible defaults
- Plugin compatibility issues don't break core functionality
- Network failures during sync don't lose data

**Recovery Mechanisms**
- Automatic rollback on export failures
- Conflict copies created when files modified in both locations
- Version history allows rollback of problematic changes
- Diagnostic information for troubleshooting

## Performance Considerations

### Optimization Strategies

**File Processing**
- Lazy loading of transformers and dependencies
- Streaming file processing for large vaults
- Parallel processing of independent files
- Efficient pattern matching with word boundaries

**Memory Management**
- Streaming markdown parsing for large files
- Garbage collection friendly patterns
- Minimal in-memory data structures
- Efficient string operations and interpolation

**Sync Performance**
- Incremental sync with change detection
- Checksum-based file comparison
- Background processing for non-blocking operations
- Configurable sync frequency and batching

### Scalability Targets

**File Count Support**
- Small vaults (50-200 files): <2 seconds export time
- Medium vaults (200-1000 files): <10 seconds export time
- Large vaults (1000+ files): <30 seconds export time

**Memory Usage**
- Base operation: <50MB RAM
- Large file processing: <100MB RAM peak
- Background sync: <10MB additional RAM

**Storage Efficiency**
- Minimal overhead on top of source files
- Optional compression for version history
- Efficient storage of sync metadata

## Deployment Architecture

### Distribution Strategy

**NPM Package Distribution**
```bash
npm install -g scry-obsidian-export
scry export --vault-path ~/my-vault
```

**Binary Distribution**
- Standalone executables for macOS, Windows, Linux
- No Node.js requirement for end users
- Auto-updating mechanism for future versions

**Development Setup**
```bash
git clone <repository>
cd scry-obsidian-export
npm install
npm run build
npm link
scry --help
```

### Platform Compatibility

**Operating Systems**
- macOS: Native support with HFS+ and APFS filesystems
- Windows: Native support with NTFS filesystems
- Linux: Native support with ext4, btrfs, xfs filesystems

**Obsidian Integration**
- Desktop: Full plugin ecosystem support
- Mobile: Core markdown functionality, limited plugin support
- Sync Services: iCloud, Dropbox, Obsidian Sync compatibility

### Configuration Management

**Default Configuration**
```yaml
# .scryrc.yaml (user overrides)
vault_path: ./obsidian-vault
source_paths:
  rituals: .bmad/scry/scry-knowledge/rituals
  entities: .bmad/scry/entities
export_options:
  overwrite: false
  backup_enabled: true
sync:
  mode: manual
  conflict_resolution: newest
```

**Environment Variables**
```bash
SCRY_VAULT_PATH=~/Documents/ObsidianVault
SCRY_CONFIG_PATH=~/.config/scry/config.yaml
SCRY_LOG_LEVEL=debug
```

## Development Environment

### Prerequisites

**Required Software**
- Node.js 20+ (required by cli-typescript-starter)
- Git (for version control)
- Obsidian (for testing vault integration)

**Recommended Tools**
- VS Code with TypeScript and Prettier extensions
- Obsidian with Dataview and Templater plugins for testing

### Development Commands

**Setup Commands**
```bash
# Clone and setup
npx degit kucherenko/cli-typescript-starter scry-obsidian-export
cd scry-obsidian-export
npm install

# Add project dependencies
npm install gray-matter write-file-atomic chokidar fast-glob zod

# Development workflow
npm run build          # Compile TypeScript
npm run test           # Run test suite
npm run lint           # Code quality checks
npm run dev            # Watch mode for development
```

**Testing Commands**
```bash
npm run test                    # Run all tests
npm run test:unit              # Unit tests only
npm run test:integration       # Integration tests
npm run test:coverage          # Generate coverage report
npm run test:watch             # Watch mode for TDD
```

### Quality Assurance

**Code Quality**
- ESLint configuration from starter template
- Prettier for consistent code formatting
- Conventional commits enforced by commitlint
- TypeScript strict mode enabled

**Testing Strategy**
- Unit tests for all transformers and utilities
- Integration tests for end-to-end workflows
- Snapshot tests for output validation
- Cross-platform testing (macOS, Windows, Linux)

**Release Process**
- Automated semantic versioning based on conventional commits
- Automated NPM publishing via GitHub Actions
- Change log generation from commit history
- Binary distribution for multiple platforms

## Architecture Decision Records

### ADR-001: Modular Transformer Architecture
**Status**: Accepted
**Decision**: Use separate transformer classes for each content type
**Consequences**: Clear separation of concerns, easier testing, prevents agent conflicts
**Alternatives considered**: Monolithic transformation function, pipeline approach

### ADR-002: Two-Pass Link Generation Algorithm
**Status**: Accepted
**Decision**: Separate exact matching from context-aware matching
**Consequences**: Higher accuracy, fewer false positives, maintainable rules
**Alternatives considered**: Fuzzy matching, pure exact matching, ML-based detection

### ADR-003: Hybrid Configuration Management
**Status**: Accepted
**Decision**: Code defaults + optional YAML overrides + CLI flags
**Consequences**: Works out-of-box, customizable, maintainable defaults
**Alternatives considered**: YAML-only, TypeScript-only, package.json configuration

### ADR-004: Multi-Level Obsidian Properties
**Status**: Accepted
**Decision**: Progressive enhancement with basic, enhanced, and technical property levels
**Consequences**: Works everywhere → enhanced in Obsidian → full power with plugins
**Alternatives considered**: Basic only, plugin-only format, custom binary format

### ADR-005: Manual Sync Strategy with Future Enhancement
**Status**: Accepted
**Decision**: Start with CLI commands, add auto-watch for journals later
**Consequences**: Simple MVP, offline-friendly, user control, future enhancement path
**Alternatives considered**: Full auto-sync, scheduled sync, background daemon

---

## Implementation Readiness

This architecture document provides complete guidance for AI agents implementing the 30 stories across 5 epics. All critical decisions have been made, patterns established, and dependencies specified. The modular design ensures that agents can work independently while maintaining consistency across the entire codebase.

The architecture prioritizes data integrity, cross-platform compatibility, and progressive enhancement while establishing clear boundaries between concerns and providing comprehensive patterns for consistent implementation.

**Next Steps**: Begin Epic 1 implementation with Story 1.1 (Project Setup) following the established patterns and decisions.

---

_Generated by BMAD Decision Architecture Workflow v1.0_
_Date: 2025-11-10_
_For: Lem_