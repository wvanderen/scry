# Scry Astrology System Product Requirements Document (PRD)

**Author:** Lem
**Date:** 2025-11-09
**Project Level:** 2-3
**Target Scale:** Personal use with future multi-user deployment

---

## Goals and Background Context

### Goals

- **Accurate Ephemeris Engine:** Implement precise planetary position calculations that match established ephemeris sources (Swiss Epheresis or JPL) for reliable astrological data
- **Seamless Agent Integration:** Create clean data interfaces that feed structured astrological information to Astraeus for rich interpretive analysis and storytelling
- **Extensible Architecture:** Design modular systems that can easily incorporate additional astrological techniques (synastry, progressions, timelords) as the system evolves
- **Performance Optimized:** Deliver fast response times for chart calculations and transit queries to enable conversational, real-time astrological consultations

### Background Context

The Astrology System addresses the critical need for precise, reliable astrological calculations within the Scry ecosystem. Current options fall into two categories: hosted APIs that provide limited control and create vendor dependencies, or manual data entry that's error-prone and unsustainable. By building a dedicated ephemeris engine, we create a foundation that serves both immediate personal use and future multi-user deployment.

This system transforms Astraeus from a conceptual agent into a fully functional astrological advisor, enabling the sophisticated cosmic weather reporting, natal chart analysis, and magical timing guidance that's central to Lem's spiritual practice. The technical architecture draws from established astrological computation approaches while designing for modern API integration and extensibility.

---

## Requirements

### Functional Requirements

**Core Calculation Engine:**

- **FR001:** Calculate precise planetary positions (Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto) for any given date/time and geographic location
- **FR002:** Calculate house cusps using whole sign house system with configurable alternatives (Placidus, Equal, etc.)
- **FR003:** Compute major aspect relationships between planets (conjunction, square, trine, opposition, sextile) with configurable orbs
- **FR004:** Calculate natal chart wheel positions including Ascendant, Midheaven, Lunar Nodes, and additional chart points
- **FR005:** Generate transit calculations showing current planetary positions relative to natal chart positions

**Data Management & Storage:**

- **FR006:** Store and retrieve birth chart data with associated metadata (location, accuracy notes, house system preferences)
- **FR007:** Cache ephemeris calculations for common date ranges to improve response times
- **FR008:** Maintain calculation audit trails for reproducibility and debugging

**API Interface Layer:**

- **FR009:** Provide RESTful API endpoints for natal chart calculations (input: date, time, location; output: structured chart data)
- **FR010:** Provide API endpoints for transit calculations (input: date range, natal chart; output: transit hits)
- **FR011:** Return data in structured JSON format optimized for agent consumption (positions, aspects, houses)
- **FR012:** Support batch calculations for multiple dates or charts

**Agent Integration:**

- **FR013:** Provide data interfaces specifically designed for Astraeus agent consumption
- **FR014:** Include metadata and context in API responses (planetary dignities, elemental balances, aspect patterns)
- **FR015:** Support progressive data loading for complex astrological analyses

**Configuration & Extensibility:**

- **FR016:** Support multiple house systems and zodiac calculations (tropical/sidereal) with user-selectable defaults
- **FR017:** Configurable aspect orbs and weighting systems for different astrological traditions
- **FR018:** Plugin architecture for adding new calculation methods or chart types

### Non-Functional Requirements

- **NFR001:** Calculation accuracy within ±0.01 degrees of Swiss Ephemeris reference data
- **NFR002:** API response times under 2 seconds for single chart calculations
- **NFR003:** Support for date range from 1900-2100 with geographic coordinates worldwide
- **NFR004:** Graceful error handling with meaningful error messages for invalid inputs
- **NFR005:** Maintain calculation precision and prevent floating-point rounding errors

---

## User Journeys

### Journey 1: Astraeus Natal Chart Analysis

**Trigger:** User requests natal chart reading from Astraeus
**Goal:** Provide comprehensive chart data for interpretive analysis

**Flow:**
1. Astraeus receives request for natal chart analysis
2. Agent calls API with birth data (date: 1992-10-28, time: 22:30, location: Lexington, KY)
3. Ephemeris engine calculates planetary positions, houses, and aspects
4. System returns structured JSON with:
   - Planetary positions by sign, house, and degree
   - House cusp positions
   - Major aspect configurations
   - Additional chart points (Ascendant, MC, nodes)
5. Astraeus interprets data through storytelling lens, providing cosmic narrative
6. User receives rich astrological guidance integrated with spiritual practice context

### Journey 2: Real-time Transit Consultation

**Trigger:** User asks Astraeus about current astrological conditions
**Goal:** Provide up-to-date transit analysis showing current cosmic weather

**Flow:**
1. User queries current transits or specific date conditions
2. Astraeus calls transit API with current date/time and user's natal data
3. System calculates current planetary positions
4. Engine computes aspects between current positions and natal chart
5. API returns transit hits with orb distances and approaching/separating status
6. Astraeus weaves transit data into weather report narrative
7. User receives practical guidance for magical timing and spiritual practice

### Journey 3: Configuration Management

**Trigger:** Lem needs to adjust system preferences or add calculation methods
**Goal:** Maintain flexibility for different astrological approaches

**Flow:**
1. Lem accesses system configuration (default: whole sign, tropical)
2. System loads current settings and available options
3. Lem modifies preferences (house systems, aspect orbs, date ranges)
4. Configuration updates immediately affect subsequent calculations
5. System validates settings and confirms successful changes

---

## UX Design Principles

- **Agent-First Design:** Optimize all interfaces for Astraeus consumption, not human UI
- **Contextual Intelligence:** Include mythological, symbolic, and practical context in all responses
- **Conversational Flow:** Design for back-and-forth interaction patterns typical of agent consultations
- **Extensibility:** Architecture that grows in sophistication without breaking existing functionality

---

## User Interface Design Goals

This is an API-first system with no direct human interface. The "UI" is the data structure and response format that Astraeus consumes. Design goals focus on:

- **Narrative-Ready Data:** Structure responses to facilitate storytelling and interpretation
- **Contextual Enrichment:** Include metadata that enables rich, contextual guidance
- **Performance Optimization:** Response times that enable natural conversation flow
- **Developer Experience:** Clean, well-documented APIs that are easy to work with

---

## Epic List

- **Epic 1: Ephemeris Engine Foundation**
  Establish core planetary calculation infrastructure with Swiss Ephemeris integration
  - *Estimated Stories:* 7

- **Epic 2: Chart Calculation & API Layer**
  Implement natal chart calculations, transit analysis, and RESTful API endpoints
  - *Estimated Stories:* 9

- **Epic 3: Agent Integration & Optimization**
  Optimize data structures for Astraeus consumption and implement advanced features
  - *Estimated Stories:* 8

- **Epic 4 (Future): Advanced Astrological Features**
  Add synastry, progressions, timelords, and other advanced techniques
  - *Estimated Stories:* 10-12

> **Note:** Detailed epic breakdown with full story specifications is available in [epics.md](./epics.md)

---

## Out of Scope

**Explicitly excluded from this PRD to maintain focus:**

- **Advanced Predictive Techniques:** Secondary progressions, solar returns, planetary returns (deferred to future epic)
- **Synastry and Composite Charts:** Relationship astrology capabilities (future expansion)
- **Mundane Astrology:** National charts, world event analysis (future specialization)
- **Horary Astrology:** Divinatory chart interpretation for specific questions (advanced feature)
- **Financial Astrology:** Market prediction and economic forecasting (specialized domain)
- **Medical Astrology:** Health-related astrological analysis (specialized domain requiring additional expertise)
- **Mobile/Web Interface:** Direct user interface (system is API-first for agent integration)
- **Third-party Integrations:** Connections to other astrological services or platforms

**The scope is focused on creating the most accurate, agent-friendly ephemeris engine possible for personal spiritual practice use.**