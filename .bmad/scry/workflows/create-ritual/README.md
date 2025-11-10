# Create Ritual Workflow

**Author:** Lem
**Module:** Scry
**Type:** Document Workflow

## Purpose

The `create-ritual` workflow creates structured ritual practice documents for use within the Scry BMAD module. It supports multiple creation approaches: collaborative design of new rituals, quick processing of existing ritual text, and adaptation of established practices.

## How to Invoke

**Direct Command:**
```
/bmad:scry:workflows:create-ritual
```

**Or via IDE command palette:**
Search for "Create Ritual" and select the workflow.

## Creation Modes

### 1. Collaborative Creation (Default)
Design a new ritual from scratch through guided exploration:
- Discover ritual purpose and context
- Define structure and components
- Create detailed instructions
- Design logging framework
- Collaborate on refinement

### 2. Quick Mode
Convert existing ritual text into a structured document:
- Paste or load existing ritual instructions
- Automatically structure and organize
- Enhance with preparation and safety guidance
- Add tailored logging framework
- Maintain authentic content while improving usability

### 3. Adapt & Enhance
Modify existing rituals to better serve current needs:
- Load base ritual to adapt
- Explore adaptation intentions
- Collaboratively enhance practices
- Create evolution-aware logging
- Honor tradition while personalizing

## Output Location

**Rituals are saved to:** `.bmad/scry/scry-knowledge/rituals/`

This makes rituals accessible to other Scry agents and workflows for program creation and ritual management.

## Generated Outputs

**Dynamic Naming:** Files are named based on the actual ritual (e.g., "hekate-evening-devotional.md" instead of generic "ritual-instructions.md")

Based on the selected mode, outputs include:

**For Collaborative Creation:**
- Ritual context and intentions
- Structured ritual framework
- Detailed practice instructions
- Custom logging framework

**For Quick Mode:**
- Original ritual text preserved
- Structured and enhanced version
- Safety and preparation guidance
- Tailored logging prompts

**For Adapt & Enhance:**
- Base ritual preserved
- Adaptation intentions documented
- Enhanced ritual version
- Evolution-supporting logging

## Special Features

- **Three Creation Modes**: Supports new creation, quick processing, and adaptation
- **Intelligent Structuring**: Organizes existing content while preserving authenticity
- **Scry Integration**: Outputs to scry-knowledge for agent accessibility
- **Evolution-Aware**: Logging supports ongoing ritual development
- **Tradition Respectful**: Honors existing practices while enhancing usability
- **Safety Conscious**: Includes grounding and protection considerations

## Workflow Style

Uses **intent-based approach** with **mode-dependent interactivity**:
- **Collaborative**: High interactivity, deep exploration
- **Quick Mode**: Low interactivity, efficient processing
- **Adapt**: Medium-high interactivity, guided enhancement

## Requirements

- Scry module properly installed in BMAD
- For Quick Mode: Access to existing ritual text
- For Adapt Mode: Base ritual to modify
- Openness to meaningful spiritual practice

---

*Enhanced ritual creation for the Scry module's magical practice ecosystem*