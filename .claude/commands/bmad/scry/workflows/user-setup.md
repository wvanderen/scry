---
name: 'user-setup'
description: 'Scry workflow: user-setup'
---

Follow this workflow exactly. Do not improvise outside the prescribed steps.

<workflow-activation CRITICAL="TRUE">
1. LOAD the workflow executor at @.bmad/core/tasks/workflow.xml.
2. READ the entire workflow config @.bmad/scry/workflows/user-setup/workflow.yaml and pass it as 'workflow-config' to the executor.
3. Follow workflow.xml instructions exactly; do not reorder or skip tasks.
4. Consult the detailed instructions at @.bmad/scry/workflows/user-setup/instructions.md.
5. Use the template at @.bmad/scry/workflows/user-setup/template.md.
6. Validate outputs against @.bmad/scry/workflows/user-setup/checklist.md.
7. Persist deliverables after each section and halt if validation fails.
</workflow-activation>
