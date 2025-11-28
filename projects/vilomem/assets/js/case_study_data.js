const caseStudyData = [
  {
    id: 1,
    question: "Is the traffic light green?",
    logic_memory: null,
    visual_memory: "When counting illuminated traffic lights, <strong>verify the color of each light individually and confirm it is part of a traffic signal assembly</strong>, not a decorative or non-traffic light fixture.",
    image: "assets/images/case1.webp"
  },
  {
    id: 2,
    question: "What percent of the sun is showing?",
    logic_memory: "When calculating the range of a data set, always double-check that the minimum and maximum values are correctly identified by reviewing all data points, especially when values repeat or are close in magnitude.",
    visual_memory: "When <strong>identifying 'tiny thing' or relative positions</strong>, always <strong>verify object size and spatial layout from the viewer's perspective</strong>. Matte finish and right-side positioning must be visually confirmed, not assumed.",
    image: "assets/images/case2.webp"
  },
  {
    id: 3,
    question: "Move the ruler to measure the length of the pencil to the nearest inch. The pencil is about (_) inches long.",
    logic_memory: "When solving geometry problems involving squares inscribed in circles or angles formed by intersecting chords, verify key relationships such as the diagonal of the square equaling the circle's diameter and the angle measure being half the sum of the intercepted arcs.",
    visual_memory: "Always <strong>verify the exact starting point of the object being measured on the ruler</strong>. Do not assume alignment with 0 cm unless visually confirmed, as the object may begin at a non-zero mark.",
    image: "assets/images/case3.webp"
  },
  {
    id: 4,
    question: "Are blue lines in the image parallel? Yes or No",
    logic_memory: "When applying the Corresponding Angles Postulate, always verify that the angles lie on the same side of the transversal and in matching positions at each intersection.",
    visual_memory: "When assessing parallelism of lines surrounded by diagonal patterns, use a ruler or grid overlay to verify true orientation and spacing, as the <strong>background can induce a perceptual illusion of verticality or parallelism</strong>. When comparing line lengths in an image, <strong>measure or visually align them directly</strong> rather than relying on assumptions about known optical illusions.",
    image: "assets/images/case4.webp"
  },
  {
    id: 5,
    question: "Where is the sheep?",
    logic_memory: null,
    visual_memory: "When identifying objects relative to others in a scene, <strong>always verify both the object's identity and its spatial position (left/right/front/back) by comparing their actual locations in the image</strong>, not assumptions based on size or context.",
    image: "assets/images/case5.webp"
  },
  {
    id: 6,
    question: "What is the position of the sink relative to the refrigerator?",
    logic_memory: "When a question asks for the direction of object A relative to object B, ensure the reference frame is correctly oriented: <strong>\"A in relation to B\" means you start from B</strong> and <strong>determine where A lies, not the reverse</strong>. Always double-check the subject and reference point in directional questions to avoid reversing the relationship.",
    visual_memory: "When identifying objects relative to others in a scene, <strong>always verify both the object's identity and its spatial position by comparing their actual locations in the image</strong>, not assumptions based on size or context.",
    image: "assets/images/case6.webp"
  },
  {
    id: 7,
    question: "What is the value of the smallest individual bar in the whole chart?",
    logic_memory: "When interpreting values on a logarithmic scale, remember that tick marks represent powers of 10, and values between 10² and 10³ range from 100 to 1000. Always verify whether a bar exceeds a linear threshold like 100 by estimating its actual value, not just its position relative to 10².",
    visual_memory: "On a logarithmic scale, a bar ending exactly at a labeled tick (e.g., 10²) represents that exact value, not a value greater than it. <strong>Always check if the bar exceeds the tick mark to determine if it's strictly larger</strong>.",
    image: "assets/images/case7.webp"
  },
  {
    id: 8,
    question: "When does the function value first reach 2?",
    logic_memory: "When matching a correctly identified element (e.g., a region, value, or object) to a multiple-choice option, always verify that the letter of the choice corresponds to the correct labeled item in the diagram or question, not just the reasoning outcome.",
    visual_memory: "When interpreting a step function graph, <strong>always verify the exact y-value of each horizontal segment by aligning it with the y-axis gridlines</strong>, rather than assuming values based on adjacent steps or integer patterns.",
    image: "assets/images/case8.webp"
  }
];
