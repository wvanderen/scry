# Scry User Setup Workflow Instructions

<critical>The workflow execution engine is governed by: {project-root}/bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {project-root}/bmad/scry/workflows/user-setup/workflow.yaml</critical>
<critical>Communicate in {communication_language} throughout the workflow process</critical>

<workflow>

<step n="1" goal="Welcome and Basic Information Collection">
<action>Greet {user_name} and welcome them to the Scry user setup process.</action>

<action>Explain the purpose of this workflow:
"This interactive session will help us create your personalized Scry profile by collecting:
- Your basic information and preferences
- Natal astrological data for personalized insights
- Personal bio and spiritual background
- Ritual preferences and daily circuit design
- Astrological interests and correspondence preferences

All information will be compiled into a structured scry-profile.md file for use with the Scry application."</action>

<action>Now collect basic information using prescriptive questions for consistent data structure:</action>

<ask>What is your full name? (Please provide in format: First Last)</ask>
<action>Store response as {{user_full_name}}</action>

<ask>What is your preferred name or nickname? (Leave blank if same as full name)</ask>
<action>Store response as {{user_preferred_name}}</action>

<ask>What are your pronouns? (e.g., they/them, she/her, he/him)</ask>
<action>Store response as {{user_pronouns}}</action>

<template-output>basic_info</template-output>
</step>

<step n="2" goal="Natal Astrological Data Collection">
<action>Now we need to collect your natal astrological information for accurate chart calculations and personalized guidance.</action>

<ask>What is your birth date? (Please provide in YYYY-MM-DD format, e.g., 1990-05-15)</ask>
<action>Validate date format and store as {{birth_date}}</action>

<ask>What is your birth time? (Please provide in 24-hour HH:MM format, e.g., 14:30. If unknown, enter 12:00)</ask>
<action>Validate time format and store as {{birth_time}}</action>

<ask>What is your birth location? (Please provide as City, Country format, e.g., London, UK)</ask>
<action>Store as {{birth_location}}</action>

<action>If time zone is ambiguous, ask for clarification:
"For birth times, please specify the time zone if known, or confirm if the time is local to the birth location."</action>

<ask>Please confirm your natal data:
- Date: {{birth_date}}
- Time: {{birth_time}}
- Location: {{birth_location}}

Is this correct? [yes/no]</ask>

<action if="user response is 'no'">Allow correction of individual fields, then re-confirm.</action>

<template-output>natal_data</template-output>
</step>

<step n="3" goal="Personal Bio and Spiritual Background">
<action>Now let's explore your personal spiritual journey and background in a more conversational way.</action>

<action>Engage in collaborative discovery to understand their spiritual path:

Ask open-ended questions to explore:
- What spiritual traditions or practices have been meaningful to you?
- How did you first become interested in rituals and astrology?
- What draws you to the Scry application specifically?
- What are your current spiritual practices or interests?
- What are your goals or intentions for spiritual practice?

Listen for clues about:
- Level of experience with ritual work
- Astrological knowledge and interests
- Personal spiritual values and beliefs
- Areas of growth or exploration they're seeking
- Previous positive or challenging experiences

Adapt your depth and terminology to their responses.
If they give brief answers, dig deeper with follow-up.
If they're uncertain, help them think through it with examples.</action>

<action>Help them articulate their personal bio by summarizing key themes and asking for confirmation:
"Based on our conversation, would it be accurate to say that [summary]? Is there anything else you'd like to add about your spiritual journey?"</action>

<template-output>personal_bio</template-output>
</step>

<step n="4" goal="Ritual Preferences and Circuit Design">
<action>Now let's explore your ritual interests and design personalized daily circuits that work with your lifestyle.</action>

<action>Reference the available ritual library:
"I can see we have ritual templates available in our knowledge base. Let me check what options we have..."</action>

<action>Load and scan {project-root}/scry-knowledge/rituals for available ritual types</action>

<action>Guide collaborative exploration of ritual preferences:

Help them discover:
- What types of rituals resonate with them (meditation, ceremony, spellwork, devotion, etc.)
- How much time they can realistically dedicate to daily practice
- What times of day work best for their schedule and energy
- What tools or elements they prefer to work with
- What their primary intentions are for ritual practice

Ask questions like:
- "What does your ideal morning practice look like?"
- "Are you more drawn to simple daily rituals or elaborate ceremonies?"
- "How much time can you realistically dedicate to practice each day?"
- "What are the most important intentions you want to focus on?"</action>

<action>Based on their responses, suggest 2-3 ritual circuit options:
"Based on what you've shared, here are some possible daily circuits that might work for you..."

Present options with:
- Time requirements
- Key elements or tools needed
- Primary focus/intentions
- Flexibility for busy days</action>

<ask>Which of these ritual circuit approaches appeals to you most? Or would you like to modify any of them?</ask>

<action>Finalize their ritual circuit preferences and store as structured data.</action>

<template-output>ritual_preferences</template-output>
</step>

<step n="5" goal="Astrological Interests and Correspondence Preferences">
<action>Let's explore your astrological interests and how you'd like to work with correspondences and cosmic timing.</action>

<action>Load and scan {project-root}/scry-knowledge/astrology and {project-root}/scry-knowledge/correspondences for available systems</action>

<action>Facilitate discovery of astrological interests:

Guide them to explore:
- What aspects of astrology interest them most (natal charts, transits, electional astrology, planetary magic, etc.)
- Their current level of astrological knowledge
- How they prefer to receive astrological insights
- What correspondence systems resonate with them (planetary, elemental, zodiacal, etc.)
- How they want to integrate astrology into their daily practice

Ask questions like:
- "What drew you to astrology originally?"
- "How do you currently work with astrological energies?"
- "Are there particular planets, signs, or cosmic patterns you feel connected to?"
- "How would you like to receive astrological guidance?"</action>

<action>Present relevant correspondence options based on their interests and the available knowledge base</action>

<action>Help them select their preferred correspondence systems and astrological focus areas</action>

<template-output>astrological_interests</template-output>
</step>

<step n="6" goal="Profile Review and Customization">
<action>Now let's review your complete profile and make any adjustments before finalizing.</action>

<action>Present the complete profile data for review:

## Basic Information
- **Name:** {{user_full_name}}
- **Preferred Name:** {{user_preferred_name}}
- **Pronouns:** {{user_pronouns}}

## Natal Astrological Data
- **Birth Date:** {{birth_date}}
- **Birth Time:** {{birth_time}}
- **Birth Location:** {{birth_location}}

## Personal Bio
{{personal_bio}}

## Ritual Preferences
{{ritual_preferences}}

## Astrological Interests
{{astrological_interests}}

</action>

<ask>Please review your profile. Is there anything you'd like to change or add? [yes/no]</ask>

<action if="user response is 'yes'">Allow specific edits to each section, updating the corresponding variables.</action>

<ask>Are you satisfied with your complete Scry profile? [yes/no]</ask>

<action if="user response is 'no'">Continue refinement until satisfied.</action>

<template-output>reviewed_profile</template-output>
</step>

<step n="7" goal="Generate Final Profile">
<action>Perfect! Now I'll create your final Scry profile document.</action>

<action>Create the scry-profile.md file using the template with all collected data</action>

<action>Save the profile to {output_folder}/scry-profile.md</action>

<action>Provide a completion summary for {user_name}:

"Congratulations! Your Scry profile has been created successfully.

Your profile includes:
- Complete personal and natal information
- Personalized ritual circuits designed for your lifestyle
- Astrological preferences and correspondence systems
- A comprehensive bio documenting your spiritual journey

The profile is saved as scry-profile.md and can be used by the Scry application to provide:
- Personalized ritual guidance
- Astrological insights based on your natal chart
- Customized daily practice recommendations
- Correspondence system integration

Next steps:
- Your profile will be available for use with Scry application features
- You can update your preferences at any time by running this workflow again
- The ritual circuits we designed can be implemented as daily practices

Welcome to your personalized Scry journey!"</action>

<template-output>final_profile</template-output>
</step>

</workflow>