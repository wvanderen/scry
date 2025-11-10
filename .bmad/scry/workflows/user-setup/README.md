# Scry User Setup Workflow

**Author:** Lem
**Module:** scry
**Version:** 1.0.0
**BMAD Core Version:** 6.0.0

## Purpose

Interactive user setup workflow for the Scry application that configures personal profiles, ritual circuits, and natal astrological data for personalized spiritual guidance.

## What It Does

This workflow creates a comprehensive user profile (`scry-profile.md`) that includes:

1. **Personal Information** - Name, pronouns, and personal bio
2. **Natal Astrological Data** - Birth date, time, and location for chart calculations
3. **Ritual Preferences** - Personalized daily practice circuits and scheduling
4. **Astrological Interests** - Correspondence systems and focus areas
5. **Integration Settings** - Preferences for personalized guidance

## How to Invoke

**Direct Invocation (Standalone):**
```
/user-setup
```

**From IDE Commands:**
- The workflow will appear as "Scry User Setup" in the command palette

**From Other Workflows:**
```xml
<invoke-workflow>{project-root}/bmad/scry/workflows/user-setup/workflow.yaml</invoke-workflow>
```

## Expected Inputs

### Optional References
The workflow can reference existing knowledge bases:
- `@scry-knowledge/rituals/` - Ritual templates and examples
- `@scry-knowledge/correspondences/` - Magical and spiritual correspondence systems
- `@scry-knowledge/astrology/` - Astrological reference materials

### User Input Required
- Basic personal information (name, pronouns)
- Natal data (birth date, time, location)
- Spiritual background and experience
- Practice preferences and time availability
- Astrological interests

## Generated Outputs

**Primary Output:** `{output_folder}/scry-profile.md`

A structured user profile document that can be used by Scry application features for:
- Personalized ritual guidance
- Astrological insights and timing
- Correspondence system integration
- Adaptive learning and recommendation refinement

## Workflow Structure

### Mixed-Style Approach
- **Steps 1-2:** Prescriptive data collection (consistent structure)
- **Steps 3-5:** Intent-based discovery (personalized exploration)
- **Steps 6-7:** Review and finalization

### 7-Step Process
1. Welcome and basic information collection
2. Natal astrological data collection
3. Personal bio and spiritual background discovery
4. Ritual preferences and circuit design
5. Astrological interests and correspondence preferences
6. Profile review and customization
7. Generate final profile document

## Dependencies

### Current Requirements
- BMAD Core v6.0.0+
- Scry module configuration
- Access to scry-knowledge directory (optional)

### Future Integration (Not Yet Implemented)
- Astrology calculation libraries for natal chart generation
- Ritual template engine for automated circuit design
- Correspondence lookup tools

## Configuration

The workflow uses the scry module configuration (`bmad/scry/config.yaml`) which includes:
- User preferences and language settings
- Output folder configuration
- Scry-specific knowledge base paths
- Default ritual circuit settings

## Customization

### Adding New Profile Sections
1. Update `template.md` with new sections and variables
2. Add corresponding steps in `instructions.md`
3. Update `checklist.md` with validation criteria
4. Update variable mapping in workflow steps

### Modifying Questions
- Edit prescriptive questions in Steps 1-2 for different data formats
- Adjust intent-based guidance in Steps 3-5 for different discovery approaches
- Update template variables accordingly

## Integration with Scry Application

Once the BMAD system is installed and compiled, this workflow will:
- Be available as a direct command for users
- Generate profiles compatible with Scry features
- Support repeated execution for profile updates
- Integrate with ritual and astrology knowledge bases

## Installation and Setup

1. **BMAD Method Installation** - Run the BMAD installer on this project
2. **Compile Agents** - Select 'Compile Agents (Quick rebuild of all agent .md files)'
3. **Verify Installation** - Test the workflow with `/user-setup`

## Support

For issues or enhancement requests:
- Check the validation checklist (`checklist.md`) for troubleshooting
- Verify all file paths in the configuration
- Ensure scry-knowledge directory is accessible if referenced
- Review BMAD Core documentation for workflow conventions

---

*This workflow was created using the BMAD Workflow Builder and follows BMAD v6.0.0 conventions.*