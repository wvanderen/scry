# Create Ritual - Workflow Instructions

<critical>The workflow execution engine is governed by: {project-root}/.bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {installed_path}/workflow.yaml</critical>
<critical>You MUST fully understand the workflow creation guide to follow ALL conventions for optimal human-AI collaboration</critical>
<critical>Communicate in {communication_language} throughout the workflow creation process</critical>

<workflow>

<step n="0" goal="Choose creation mode">
<ask>How would you like to create this ritual?

1. **Collaborative Creation** - Work together to design a new ritual from scratch
2. **Quick Mode** - Convert existing ritual instructions into a structured document
3. **Adapt & Enhance** - Take an existing ritual and modify/expand it

Select your preferred mode:</ask>

<action if="user_response includes 'Collaborative Creation' or user_response includes '1'">
Set workflow_mode to 'collaborative' - proceed with full ritual creation process
</action>

<action if="user_response includes 'Quick Mode' or user_response includes '2'">
Set workflow_mode to 'quick' - jump to processing existing ritual text
</action>

<action if="user_response includes 'Adapt & Enhance' or user_response includes '3'">
Set workflow_mode to 'adapt' - load existing ritual and modify collaboratively
</action>

<template-output>workflow_mode</template-output>
</step>

<step n="1" goal="Get ritual name and create filename">
<ask>What is the name of this ritual? This will be used for both the document title and filename.</ask>

<action>Capture the ritual name and create a filename-friendly version:
- Store the full ritual name as {{ritual_name}} for document title
- Create {{ritual_filename}} by:
  * Converting to lowercase
  * Replacing spaces with hyphens
  * Removing special characters (keeping letters, numbers, hyphens)
  * Ensuring it's descriptive and unique

Example: " Evening Hekate Devotional " → "hekate-evening-devotional"
</action>

<template-output>ritual_name</template-output>
<template-output>ritual_filename</template-output>
</step>

<step n="2" goal="Discover ritual purpose and context" if="workflow_mode == 'collaborative'">
<action>Engage in collaborative discovery to understand the user's ritual intentions:

Guide the user to explore:
- What type of ritual they want to create (spiritual, personal, seasonal, ceremonial, etc.)
- The tradition or context this ritual draws from (if any)
- The primary purpose and intended outcomes of the practice
- Who will participate (individual, group, specific roles)
- Time and space considerations for the ritual
- Any tools, materials, or sacred objects involved

Listen for clues about:
- Their experience level with ritual practice
- What makes this ritual meaningful to them
- Practical constraints or requirements
- Emotional or spiritual intentions
- Connection to existing practices or traditions

Adapt your depth and terminology based on their responses.
If they're new to ritual practice, provide gentle guidance and frameworks.
If they're experienced, honor their knowledge and build upon their understanding.
</action>

<template-output>ritual_context</template-output>
</step>

<step n="3" goal="Define ritual structure and components" if="workflow_mode == 'collaborative'">
<action>Collaborate on establishing the ritual framework and key elements:

Guide them through considering:
- Opening/closing practices (grounding, centering, release)
- Main sequence of actions or meditations
- Transition points and flow between elements
- Use of symbols, words, or gestures
- Integration of sensory elements (sound, scent, light, etc.)

Help them determine:
- Duration and pacing of the ritual
- Physical setup and space preparation
- Any prerequisites or preparation steps
- Ways to mark sacred time/space

Present common ritual structures as inspiration:
- Three-part: Preparation → Main Work → Integration
- Four directions/elements framework
- Circular/seasonal patterns
- Narrative/journey structure

Let them choose what resonates while ensuring completeness.
</action>

<template-output>ritual_structure</template-output>
</step>

<step n="4" goal="Create detailed ritual instructions" if="workflow_mode == 'collaborative'">
<action>Guide the creation of step-by-step ritual guidance:

For each ritual element, collaborate on:
- Clear, actionable instructions for participants
- Timing cues and duration guidance
- Verbal scripts or suggested words
- Physical actions and movements
- Mindset or intention for each phase

Ensure instructions include:
- Preparation steps and setup
- Entry into sacred space/time
- Core ritual activities
- Closing and integration
- Post-ritual care or grounding

Write with:
- Gentle, inviting language
- Options for adaptation based on need
- Clear progression through the ritual
- Space for personalization and intuition

Review for clarity, safety, and accessibility.
Make sure the instructions support both beginners and experienced practitioners.
</action>

<template-output>ritual_instructions</template-output>
</step>

<step n="5" goal="Design logging and reflection framework" if="workflow_mode == 'collaborative'">
<action>Create templates for recording ritual experiences and insights:

Design a practice log that captures:
- Date, time, and conditions of the practice
- What was done (following the ritual instructions)
- Experiences, sensations, and observations
- Insights, emotions, or revelations
- Challenges or difficulties encountered
- Integration or next steps

Create reflection prompts that support:
- Recognition of patterns over time
- Deepening of personal meaning
- Adjustment and refinement of practice
- Connection to intentions and goals
- Learning from each ritual experience

Consider different logging approaches:
- Structured forms for consistency
- Free-form journaling space
- Symbolic or artistic expression
- Rating scales for energy/emotional states

Make the logging practice feel like a natural extension of the ritual itself.
</action>

<template-output>logging_framework</template-output>
</step>

<step n="6" goal="Validate and refine the complete ritual" if="workflow_mode == 'collaborative'">
<action>Review the complete ritual documentation for completeness and effectiveness:

Check that the ritual includes:
- Clear purpose and intentions
- Adequate preparation guidance
- Step-by-step instructions that flow naturally
- Safety considerations and grounding practices
- Flexible adaptation options
- Meaningful closing and integration

Validate that the logging system:
- Supports deep reflection and learning
- Fits with the ritual's style and tone
- Provides useful feedback for practice development
- Encourages consistency without being burdensome

Ask {user_name} to review the complete ritual:
"Read through the entire ritual and logging framework. Does this feel complete and authentic to your intentions? Is there anything missing or unclear?"

Offer to refine or adjust based on their feedback.
</action>

<template-output>final_ritual</template-output>
</step>

<!-- Quick Mode Steps -->
<step n="1q" goal="Load existing ritual text and extract name" if="workflow_mode == 'quick'">
<ask>Provide the existing ritual text you want to convert into a structured document:

You can:
- Paste the ritual text directly
- Provide a file path to load from
- Give me a URL to fetch from

What ritual text would you like to process?</ask>

<action>Load and analyze the provided ritual text to understand:
- Type of ritual and its purpose
- Current structure and flow
- Key elements and practices
- Any missing components that should be added
- Tradition or context it comes from

Extract the ritual name from:
- The title or header (if present)
- First few lines describing the ritual
- File name if loading from file
- Ask user for clarification if unclear

Create both {{ritual_name}} (display name) and {{ritual_filename}} (file-safe version).
</action>

<template-output>existing_ritual_text</template-output>
<template-output>ritual_name</template-output>
<template-output>ritual_filename</template-output>
</step>

<step n="2q" goal="Structure and enhance existing ritual" if="workflow_mode == 'quick'">
<action>Take the loaded ritual text and transform it into a structured document:

Organize into standard ritual format:
- Clear title and metadata
- Purpose and context section
- Structured preparation steps
- Main ritual sequence (if not already clear)
- Integration/closing practices
- Space for personal notes

Enhance the ritual by adding:
- Clear timing and duration guidance
- Physical setup and space preparation
- Safety considerations and grounding practices
- Adaptation options for different needs
- Logging prompts for practice tracking

Maintain the original ritual's authentic language and practices while making it more accessible and structured for consistent use.
</action>

<template-output>structured_ritual</template-output>
</step>

<step n="3q" goal="Create logging framework" if="workflow_mode == 'quick'">
<action>Create a practice logging system tailored to this specific ritual:

Design reflection prompts that explore:
- Experiences during each ritual phase
- Insights or revelations that emerged
- Challenges or difficulties encountered
- Connection to ritual intentions
- Patterns noticed over repeated practice
- Personal adaptations that emerged

Create a structured log format that captures:
- Date, time, and conditions
- Deviations from standard instructions
- Energetic or emotional experiences
- Symbols, visions, or inner experiences
- Integration and post-ritual reflections

Make the logging feel like a natural extension of this particular ritual's focus.
</action>

<template-output>ritual_logging</template-output>
</step>

<step n="4q" goal="Finalize and validate" if="workflow_mode == 'quick'">
<action>Review the structured ritual document for completeness and authenticity:

Ensure the enhanced ritual maintains:
- Original intentions and purpose
- Authentic practices and language
- Spiritual integrity and respect for tradition
- Practical usability for regular practice

Verify that enhancements add value:
- Clear instructions without being prescriptive
- Helpful context and preparation guidance
- Flexible adaptation options
- Meaningful logging framework

Present the final structured ritual to {user_name} for review:
"Here's your existing ritual transformed into a structured document. Does this capture the essence of the original while making it more accessible for regular practice?"
</action>

<template-output>final_quick_ritual</template-output>
</step>

<!-- Adapt & Enhance Mode Steps -->
<step n="1a" goal="Load ritual to adapt and extract name" if="workflow_mode == 'adapt'">
<ask>Provide the existing ritual you want to adapt and enhance:

You can:
- Paste the ritual text directly
- Provide a file path to load from
- Describe the ritual you want to modify

What ritual would you like to work with?</ask>

<action>Load and analyze the existing ritual, identifying:
- Current structure and elements
- Areas that could be enhanced
- Missing components for complete practice
- Opportunities for personalization
- Tradition or context being honored

Extract the ritual name from:
- The title or header (if present)
- First few lines describing the ritual
- File name if loading from file
- Ask user for clarification if unclear

Create both {{ritual_name}} (display name) and {{ritual_filename}} (file-safe version).
For adaptations, consider adding "adapted" or "enhanced" to distinguish from original.
</action>

<template-output>base_ritual</template-output>
<template-output>ritual_name</template-output>
<template-output>ritual_filename</template-output>
</step>

<step n="2a" goal="Discover adaptation intentions" if="workflow_mode == 'adapt'">
<action>Collaborate with {user_name} to understand their adaptation goals:

Explore what they want to change or enhance:
- Specific elements to modify or remove
- New practices or traditions to incorporate
- Personal elements to make it more meaningful
- Practical considerations for their situation
- Time or resource constraints to address

Guide them to clarify:
- What works well and should be preserved
- What feels incomplete or needs enhancement
- How they want the ritual to serve them now
- Any new intentions or purposes

Collaboratively plan the adaptations while honoring the ritual's core essence.
</action>

<template-output>adaptation_intentions</template-output>
</step>

<step n="3a" goal="Create enhanced ritual" if="workflow_mode == 'adapt'">
<action>Collaboratively create the adapted ritual:

Incorporate the planned changes:
- Modify existing elements as discussed
- Add new practices and components
- Refine language and flow for better experience
- Include personal touches and meaningful elements
- Ensure logical progression and timing

Maintain structure and usability:
- Clear step-by-step instructions
- Preparation and setup guidance
- Safety and grounding practices
- Options for further personalization
- Integration with their existing practice

Create a ritual that feels both familiar and freshly aligned with their current needs and understanding.
</action>

<template-output>enhanced_ritual</template-output>
</step>

<step n="4a" goal="Create adapted logging framework" if="workflow_mode == 'adapt'">
<action>Design logging that supports both the original ritual and the new elements:

Create reflection prompts for:
- How the adaptations feel in practice
- Insights from new elements or changes
- Connection between old and new practices
- Personal resonance with modifications
- Ways the ritual might continue evolving

Structure the log to track:
- Which version or variations were used
- Effects of specific adaptations
- Emergent patterns or insights
- Further refinement ideas
- Integration with their broader practice

Make the logging support ongoing evolution of their ritual practice.
</action>

<template-output>adapted_logging</template-output>
</step>

<step n="5a" goal="Validate enhanced ritual" if="workflow_mode == 'adapt'">
<action>Review the adapted ritual with {user_name}:

Check that the adaptation:
- Preserves the meaningful essence of the original
- Successfully incorporates desired changes
- Flows naturally and feels coherent
- Serves their current intentions and needs
- Maintains spiritual integrity

Ensure usability:
- Instructions are clear and actionable
- Preparation is well-guided
- Timing and flow work well
- Safety considerations are included
- Personal elements feel authentic

Invite final review and refinement:
"Here's your adapted ritual. How does it feel? Are there any adjustments that would make it more aligned with your practice?"
</action>

<template-output>final_adapted_ritual</template-output>
</step>

</workflow>