# Scry System Architecture and User Flow Diagrams

Visual representations of the enhanced Phase 1 prototype for quick understanding.

## System Architecture Overview

```mermaid
graph TB
    subgraph "User Interface"
        U[Practitioner] --> DW[Daily Practice Workflow]
    end

    subgraph "Knowledge Systems"
        KS[scry-knowledge/]
        KS --> CF[777 Foundation.yaml<br/>Correspondences]
        KS --> RL[Ritual Library/<br/>LBRP, Middle Pillar]
        KS --> AT[Astrology/<br/>Planetary Hours]
    end

    subgraph "AI Agents"
        RM[Ritual Master<br/>Primary Coordinator]
        JG[Journal Guide<br/>Experience Processing]
        T[Thoth<br/>Wisdom & Knowledge]
        H[Hekate<br/>Magical Operations]
        C[Clauneck<br/>Practical Results]
        B[Babalon<br/>Transformation]
    end

    subgraph "Workflow Management"
        DW --> RM
        RM --> T
        RM --> H
        RM --> C
        RM --> B
        RM --> JG
    end

    %% Knowledge Integration
    CF -.-> RM
    CF -.-> T
    CF -.-> H
    CF -.-> C
    CF -.-> B
    RL -.-> RM
    AT -.-> RM

    %% Styling
    classDef user fill:#e1f5fe
    classDef agent fill:#f3e5f5
    classDef knowledge fill:#e8f5e8
    classDef workflow fill:#fff3e0

    class U user
    class RM,JG,T,H,C,B agent
    class KS,CF,RL,AT knowledge
    class DW workflow
```

## Daily Practice Workflow - Complete User Journey

```mermaid
flowchart TD
    Start([Start Session]) --> Input{User Input}

    Input --> I1[Intention Setting<br/>What do you want to achieve?]
    Input --> I2[Time Available<br/>15/25/45+ minutes?]
    Input --> I3[Energy Level<br/>High/Medium/Low?]

    I1 --> RA[Ritual Master Assessment]
    I2 --> RA
    I3 --> RA

    RA --> P1[Optimal Timing<br/>Planetary hours, moon phase]
    RA --> P2[Ritual Structure<br/>Personalized sequence]
    RA --> P3[Safety & Adaptations<br/>Energy, time, experience level]

    P1 --> Prep{Preparation Phase}
    P2 --> Prep
    P3 --> Prep

    Prep --> S1[Space Consecration<br/>Clear and prepare area]
    Prep --> S2[Personal Alignment<br/>Grounding & centering]

    S1 --> Main{Main Practice}
    S2 --> Main

    Main --> R1[Ritual Orchestration<br/>Guided step-by-step execution]
    Main --> EC{Entity Consultation?}

    R1 --> Int{Integration Phase}
    EC -->|Yes| E1[Thoth<br/>Wisdom consultation]
    EC -->|Yes| E2[Hekate<br/>Magical operations]
    EC -->|Yes| E3[Clauneck<br/>Practical results]
    EC -->|Yes| E4[Babalon<br/>Transformation]
    EC -->|No| Int

    E1 --> Int
    E2 --> Int
    E3 --> Int
    E4 --> Int

    Int --> I4[Energy Balancing<br/>Grounding & integration]
    Int --> I5[Experience Capture<br/>Journal Guide processing]

    I5 --> Ana{Analysis Phase}
    I4 --> Ana

    Ana --> A1[Pattern Recognition<br/>Identify trends and insights]
    Ana --> A2[Future Planning<br/>Next session recommendations]

    A1 --> End([Session Complete])
    A2 --> End

    %% Styling
    classDef input fill:#e3f2fd
    classDef process fill:#f1f8e9
    classDef decision fill:#fff8e1
    classDef output fill:#fce4ec

    class I1,I2,I3 input
    class P1,P2,P3,S1,S2,R1,I4,I5,A1,A2 process
    class Input,Prep,Main,EC,Int,Ana decision
    class Start,End output
```

## Agent Coordination Patterns

```mermaid
sequenceDiagram
    participant U as Practitioner
    participant DW as Daily Workflow
    participant RM as Ritual Master
    participant KS as Knowledge Systems
    participant E as Entity (Thoth/Hekate/Clauneck/Babalon)
    participant JG as Journal Guide

    U->>DW: Start Daily Practice
    DW->>U: Collect intention, time, energy

    U->>DW: Provide inputs
    DW->>RM: Request personalized plan

    RM->>KS: Access correspondences & timing
    KS-->>RM: Return optimal data

    RM->>U: Present personalized ritual plan

    U->>RM: Approve and begin practice

    loop Main Practice
        RM->>U: Guide ritual steps
        U->>RM: Execute and report

        alt Entity Consultation Needed
            RM->>E: Coordinate consultation
            E->>U: Provide specialized guidance
            U->>E: Engage with entity wisdom
            E->>RM: Report consultation results
        end
    end

    RM->>JG: Coordinate experience processing
    JG->>U: Guide integration and journaling
    U->>JG: Share experiences and insights

    JG->>RM: Provide pattern analysis
    RM->>U: Offer recommendations and next steps

    U->>DW: Complete session
    DW->>RM: Update user patterns
```

## Knowledge System Integration

```mermaid
graph LR
    subgraph "Correspondences Database"
        C1[Planetary<br/>Correspondences]
        C2[Elemental<br/>Associations]
        C3[Numerical<br/>Systems]
        C4[Timing<br/>Optimization]
    end

    subgraph "Ritual Library"
        R1[LBRP<br/>Instructions]
        R2[Middle Pillar<br/>Energy Work]
        R3[Advanced<br/>Techniques]
        R4[Safety<br/>Protocols]
    end

    subgraph "Astrological System"
        A1[Planetary<br/>Hours]
        A2[Moon<br/>Phases]
        A3[Seasonal<br/>Influences]
        A4[Personal<br/>Timing]
    end

    subgraph "Agent Integration Points"
        AM[All Agents]
        T[Thoth]
        H[Hekate]
        C[Clauneck]
        B[Babalon]
        RM[Ritual Master]
        JG[Journal Guide]
    end

    %% Connections
    C1 --> AM
    C2 --> AM
    C3 --> AM
    C4 --> AM

    R1 --> RM
    R2 --> RM
    R3 --> RM
    R4 --> RM

    A1 --> RM
    A2 --> AM
    A3 --> AM
    A4 --> AM

    %% Specialized Knowledge Access
    C1 --> T
    C2 --> H
    C3 --> C
    C4 --> B
    A1 --> JG

    %% Styling
    classDef knowledge fill:#e8f5e8
    classDef agent fill:#f3e5f5

    class C1,C2,C3,C4,R1,R2,R3,R4,A1,A2,A3,A4 knowledge
    class AM,T,H,C,B,RM,JG agent
```

## User Experience Paths

### Beginner Journey (First 2 Weeks)
```mermaid
journey
    title New User Experience
    section First Week
      Initial Setup: 5: Practitioner
      Intention Setting: 3: Daily Workflow
      Basic Ritual: 4: Ritual Master
      Simple Integration: 3: Journal Guide
      Pattern Recognition: 2: Journal Guide

    section Second Week
      Consistency Building: 4: Practitioner
      Technique Refinement: 3: Ritual Master
      First Entity Contact: 3: Thoth
      Deeper Integration: 3: Journal Guide
      Weekly Review: 4: All Agents
```

### Advanced User Journey
```mermaid
journey
    title Experienced Practitioner
    section Daily Practice
      Complex Intentions: 5: Practitioner
      Advanced Timing: 4: Ritual Master
      Multi-Entity Work: 4: Multiple Entities
      Deep Processing: 5: Journal Guide
      Pattern Analysis: 5: All Agents

    section Magical Operations
      Complex Rituals: 5: Ritual Master + Hekate
      Correspondence Layering: 4: All Agents + Knowledge
      Manifestation Work: 4: Ritual Master + Clauneck
      Transformation Processing: 5: Journal Guide + Babalon
```

## Safety and Adaptation Framework

```mermaid
flowchart TD
    Start([Practice Start]) --> Assess{Current State Assessment}

    Assess -->|High Energy| HE[High Energy Protocol<br/>Extended practice<br/>Advanced techniques<br/>Deep exploration]
    Assess -->|Medium Energy| ME[Standard Protocol<br/>Balanced practice<br/>Appropriate complexity<br/>Steady development]
    Assess -->|Low Energy| LE[Gentle Protocol<br/>Shortened practice<br/>Restorative focus<br/>Energy conservation]

    HE --> Time{Time Available?}
    ME --> Time
    LE --> Time

    Time -->|15 min| T1[Essential Practice<br/>Core elements only<br/>Maintenance focus]
    Time -->|25 min| T2[Standard Practice<br/>Complete foundation<br/>Balance of elements]
    Time -->|45+ min| T3[Extended Practice<br/>Advanced techniques<br/>Deep work]

    T1 --> Adapt{Special Adaptations Needed?}
    T2 --> Adapt
    T3 --> Adapt

    Adapt -->|Physical Limitations| PL[Seated Practice<br/>Mental techniques<br/>Accessibility focus]
    Adapt -->|Emotional Sensitivity| ES[Gentle Approach<br/>Enhanced support<br/>Emotional safety]
    Adapt -->|Beginner Status| BE[Simplified instructions<br/>Clear explanations<br/>Patience emphasis]
    Adapt -->|No Special Needs| NS[Standard protocols<br/>Full techniques<br/>Regular guidance]

    PL --> Safety[Safety Check<br/>Energy protection<br/>Grounding readiness]
    ES --> Safety
    BE --> Safety
    NS --> Safety

    Safety --> Practice{Begin Practice}

    Practice --> Emergency{Emergency During Practice?}
    Emergency -->|No| Continue[Continue Practice]
    Emergency -->|Yes| Emergency[Immediate Grounding<br/>Energy clearing<br/>Recovery protocols]

    Continue --> Monitor{Monitor Progress}
    Emergency --> Monitor

    Monitor --> End[Complete Session<br/>Integration<br/>Documentation]
```

## Pattern Recognition and Learning Cycle

```mermaid
flowchart TD
    Practice([Daily Practice]) --> Capture{Experience Capture}

    Capture --> Physical[Physical Sensations<br/>Energy movements<br/>Body responses]
    Capture --> Mental[Mental States<br/>Thoughts patterns<br/>Insights received]
    Capture --> Emotional[Emotional responses<br/>Processing needs<br/>Integration status]
    Capture --> Spiritual[Spiritual experiences<br/>Entity interactions<br/>Consciousness shifts]

    Physical --> Store[Store Experience Data]
    Mental --> Store
    Emotional --> Store
    Spiritual --> Store

    Store --> Analyze[Pattern Analysis Engine]

    Analyze --> Timing[Timing Patterns<br/>Optimal practice times<br/>Astrological correlations]
    Analyze --> Technique[Technique Effectiveness<br/>Personal preferences<br/>Skill development]
    Analyze --> Energy[Energy Patterns<br/>Developmental cycles<br/>Integration needs]
    Analyze -> Life[Life Impact<br/>Practical applications<br/>Synchronicities]

    Timing --> Optimize[Optimization Algorithms]
    Technique --> Optimize
    Energy --> Optimize
    Life --> Optimize

    Optimize --> Personalize[Personalization Engine]
    Personalize --> Practice
```

## Web App Migration Architecture

```mermaid
graph TB
    subgraph "Phase 1 BMAD System"
        BMAD_BM[BMAD Core]
        BMAD_Agents[AI Agents]
        BMAD_Knowledge[Knowledge YAML]
        BMAD_Workflows[Workflows]
    end

    subgraph "Phase 2 Web Application"
        Web_Frontend[React Frontend]
        Web_API[Backend API]
        Web_DB[Database]
        Web_AI[AI Integration]
        Web_Auth[Authentication]
    end

    subgraph "Migration Process"
        M1[Agent Migration<br/>Knowledge transfer<br/>API integration]
        M2[Knowledge Migration<br/>YAML to Database<br/>Query optimization]
        M3[Workflow Migration<br/>User interface<br/>Session management]
        M4[Enhanced Features<br/>Multiplayer<br/>Real-time sync]
    end

    %% Data Flow
    BMAD_Agents -.-> M1
    BMAD_Knowledge -.-> M2
    BMAD_Workflows -.-> M3
    BMAD_BM -.-> Web_API

    %% Migration Results
    M1 --> Web_AI
    M2 --> Web_DB
    M3 --> Web_API
    M4 --> Web_Frontend

    %% Final Architecture
    Web_Frontend --> Web_API
    Web_API --> Web_DB
    Web_API --> Web_AI
    Web_API --> Web_Auth

    %% Styling
    classDef current fill:#ffebee
    classDef migration fill:#e8f5e8
    classDef future fill:#e3f2fd

    class BMAD_BM,BMAD_Agents,BMAD_Knowledge,BMAD_Workflows current
    class M1,M2,M3,M4 migration
    class Web_Frontend,Web_API,Web_DB,Web_AI,Web_Auth future
```

## Usage Statistics and Metrics

```mermaid
pie title Daily Practice Time Distribution
    "15 minutes" : 35
    "25 minutes" : 45
    "45+ minutes" : 20
```

```mermaid
pie title Entity Consultation Frequency
    "Thoth (Wisdom)" : 30
    "Hekate (Magical)" : 25
    "Clauneck (Practical)" : 20
    "Babalon (Transformation)" : 15
    "No Entity" : 10
```

```mermaid
pie title Practice Intentions
    "General Balance" : 40
    "Wisdom/Learning" : 25
    "Magical Operations" : 15
    "Healing/Integration" : 12
    "Prosperity/Success" : 8
```

These diagrams provide at-a-glance understanding of:
- **System architecture** and component relationships
- **User workflows** and decision points
- **Agent coordination** patterns
- **Knowledge integration** structure
- **Safety protocols** and adaptation frameworks
- **Learning cycles** and pattern recognition
- **Migration path** to full web application

Use these as quick references when explaining the system to new users or stakeholders!