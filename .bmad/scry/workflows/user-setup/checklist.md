# Scry User Setup Validation Checklist

## Structure Validation

- [ ] All workflow files present (workflow.yaml, instructions.md, template.md, checklist.md)
- [ ] File paths correctly configured in workflow.yaml
- [ ] Template variables properly referenced in instructions.md
- [ ] No placeholder text remaining in template.md
- [ ] YAML syntax valid in workflow.yaml

## Configuration Validation

- [ ] config_source correctly points to scry module config.yaml
- [ ] output_folder properly configured
- [ ] user_name and communication_language variables defined
- [ ] Scry module config.yaml exists and is properly structured
- [ ] recommended_inputs paths are valid and accessible

## Content Quality - Basic Information

- [ ] Full name collected and stored in {{user_full_name}}
- [ ] Preferred name collected and stored in {{user_preferred_name}}
- [ ] Pronouns collected and stored in {{user_pronouns}}
- [ ] Name data follows consistent formatting (First Last for full name)
- [ ] No placeholder values remaining in basic info variables

## Content Quality - Natal Data

- [ ] Birth date in YYYY-MM-DD format stored in {{birth_date}}
- [ ] Birth time in HH:MM format stored in {{birth_time}}
- [ ] Birth location in City, Country format stored in {{birth_location}}
- [ ] Date format validation passed (YYYY-MM-DD)
- [ ] Time format validation passed (HH:MM, 24-hour)
- [ ] Location format is clear and unambiguous
- [ ] User confirmation obtained for all natal data

## Content Quality - Personal Bio

- [ ] Spiritual background information collected
- [ ] Personal journey documented meaningfully
- [ ] User's level of experience assessed
- [ ] Goals and intentions captured
- [ ] Bio is personal and authentic to user
- [ ] Length appropriate (not too brief, not overly long)

## Content Quality - Ritual Preferences

- [ ] Ritual interests explored and documented
- [ ] Time availability assessed realistically
- [ ] Daily circuit preferences designed
- [ ] Schedule considerations incorporated
- [ ] Tools and preferences identified
- [ ] References to scry-knowledge/rituals incorporated
- [ ] Ritual circuits are practical and sustainable

## Content Quality - Astrological Interests

- [ ] Astrological knowledge level assessed
- [ ] Areas of interest identified
- [ ] Correspondence system preferences explored
- [ ] Integration with practice considered
- [ ] References to scry-knowledge/astrology incorporated
- [ ] References to scry-knowledge/correspondences incorporated

## Template Variable Mapping

- [ ] {{user_full_name}} mapped correctly from Step 1
- [ ] {{user_preferred_name}} mapped correctly from Step 1
- [ ] {{user_pronouns}} mapped correctly from Step 1
- [ ] {{birth_date}} mapped correctly from Step 2
- [ ] {{birth_time}} mapped correctly from Step 2
- [ ] {{birth_location}} mapped correctly from Step 2
- [ ] {{personal_bio}} mapped correctly from Step 3
- [ ] {{ritual_preferences}} mapped correctly from Step 4
- [ ] {{astrological_interests}} mapped correctly from Step 5
- [ ] {{date}} system variable available in template
- [ ] {{user_name}} config variable available in template
- [ ] {{communication_language}} config variable available in template

## User Experience Validation

- [ ] Welcome message clear and inviting
- [ ] Instructions for each step are understandable
- [ ] Mix of prescriptive and intent-based approaches balanced appropriately
- [ ] Review step allows comprehensive verification
- [ ] User can make corrections before finalization
- [ ] Completion summary provides clear next steps
- [ ] Profile structure is logical and easy to navigate

## Technical Validation

- [ ] Workflow follows BMAD v6 conventions
- [ ] XML tags properly formatted in instructions.md
- [ ] Step numbering is sequential (1-7)
- [ ] Conditional logic properly implemented
- [ ] Template-output tags correctly placed
- [ ] All required critical headers present
- [ ] Config variables used appropriately

## Integration Validation

- [ ] Workflow can access scry-knowledge directory
- [ ] References to ritual library are functional
- [ ] References to astrology resources are functional
- [ ] References to correspondences are functional
- [ ] Output file path is accessible
- [ ] Standalone property allows direct invocation

## Final Validation

### Profile Completeness
- [ ] All required sections present in final profile
- [ ] Personal information complete and accurate
- [ ] Natal data properly formatted and confirmed
- [ ] Bio is meaningful and personal
- [ ] Ritual preferences are practical and personalized
- [ ] Astrological interests are well-defined

### Workflow Functionality
- [ ] No broken variable references
- [ ] All file paths resolve correctly
- [ ] User interaction flow is logical
- [ ] Error handling implemented where needed
- [ ] Output generation works correctly

### Readiness for Use
- [ ] Workflow is ready for user testing
- [ ] Documentation is complete
- [ ] Integration points are functional
- [ ] Template produces well-structured output

## Issues and Action Items

### Critical Issues (Must Fix Before Use)
- [ ] No critical structural or functional issues

### Recommendations for Enhancement
- [ ] Consider adding timezone validation for birth times
- [ ] Consider adding ritual library integration when available
- [ ] Consider adding astrological calculation integration when tools are implemented
- [ ] Consider adding profile update workflow for existing users

### Future Development Opportunities
- [ ] Implement astrological chart generation
- [ ] Create ritual scheduling automation
- [ ] Add correspondence lookup tools
- [ ] Develop profile analytics and insight generation