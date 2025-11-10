# Create Ritual Workflow Validation Checklist

## Structure and Organization

- [ ] All required sections present in workflow.yaml
- [ ] Template.md contains all variables from instructions template-output tags
- [ ] Instructions.md follows proper XML structure and workflow conventions
- [ ] All file paths resolve correctly using {installed_path} and {project-root}
- [ ] Standard config block included in workflow.yaml

## Workflow Configuration

- [ ] config_source correctly points to scry module config
- [ ] output_folder, user_name, communication_language pulled from config
- [ ] standalone property set to true (direct user invocation)
- [ ] Template and instruction paths properly configured
- [ ] Default output file path specified

## Instruction Quality

- [ ] Instructions use intent-based approach for collaborative discovery
- [ ] All steps have clear goals and focus
- [ ] Actions guide without being overly prescriptive
- [ ] Variable names match template-output tags exactly
- [ ] Communication language variable used appropriately
- [ ] Workflow follows BMAD v6 conventions

## Template Design

- [ ] Template variables use snake_case convention
- [ ] All template-output variables from instructions are represented
- [ ] Document structure flows logically
- [ ] Standard metadata header included (user_name, date)
- [ ] Ritual-specific sections appropriately designed

## User Experience

- [ ] Instructions adapt to user experience level
- [ ] Ritual creation process feels collaborative and respectful
- [ ] Both beginners and experienced practitioners supported
- [ ] Flexible adaptation options provided
- [ ] Safety and grounding considerations included

## Completeness

- [ ] Ritual purpose discovery step comprehensive
- [ ] Structure definition covers essential elements
- [ ] Detailed instructions actionable and clear
- [ ] Logging framework supports deep reflection
- [ ] Validation and refinement step ensures quality
- [ ] Ready for practical ritual creation

## Final Validation

- [ ] No hardcoded values that should be variables
- [ ] All XML tags properly closed and structured
- [ ] No unused workflow.yaml fields (bloat detection)
- [ ] Cross-file variable references consistent
- [ ] Ready for BMAD installer compilation