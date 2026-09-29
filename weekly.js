const loggedIn = localStorage.getItem("loggedIn");
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (loggedIn !== "true" || !currentUser) {
    window.location.href = "login.html";
    throw new Error("User is not logged in");
}
const lmpDate = localStorage.getItem("lmpDate");

if (!lmpDate) {
    window.location.href = "pregnancy.html";
}

const lmp = new Date(lmpDate);
const today = new Date();

const daysPassed = Math.floor(
    (today - lmp) / (1000 * 60 * 60 * 24)
);

let currentWeek = Math.floor(daysPassed / 7) + 1;

if (currentWeek < 1) {
    currentWeek = 1;
}

if (currentWeek > 40) {
    currentWeek = 40;
}


// Show current week
document.getElementById("currentWeek").textContent =
    "You are currently in Week " + currentWeek + " 🌸";


// Calculate due date
const dueDate = new Date(lmp);
dueDate.setDate(dueDate.getDate() + 280);

document.getElementById("dueDate").textContent =
    "Estimated Due Date: " + dueDate.toLocaleDateString();


// Week information
const weekData = {

    1: {
        title: "Week 1 🌸",

        development:
        "Week 1 is counted from the first day of your last menstrual period. Ovulation and conception usually have not happened yet.",

        size:
        "There is no developing baby yet. Your body is preparing for ovulation.",

        symptoms:
        "You may experience normal menstrual-period symptoms during this week.",

        activity:
        "Take some time to relax, stay hydrated, eat nutritious food, and take care of yourself. 💕",

        suggestion:
        "Learn about the 40-week pregnancy journey and what to expect in the coming weeks. 📖",

        message:
        "Every beautiful journey begins with a first step. 🌷"
    },

    2: {
        title: "Week 2 🌸",
        development: "Your body is preparing for ovulation. The uterine lining continues preparing for a possible pregnancy.",
        size: "There is not yet a developing baby at this stage.",
        symptoms: "You may notice changes related to ovulation, such as mild abdominal discomfort or changes in cervical mucus.",
        activity: "Focus on rest, hydration, nutritious meals, and gentle activity if you feel comfortable. 💕",
        suggestion: "Learn about how pregnancy is dated and how the 40-week journey is calculated. 📖",
        message: "Your journey is unfolding one beautiful week at a time. 🌷"
    },
    3: {
        title: "Week 3 🌸",
        development: "Ovulation and fertilization may occur around this time. If fertilization occurs, the fertilized egg begins its journey toward the uterus.",
        size: "The developing embryo is extremely tiny, about the size of a microscopic cell cluster.",
        symptoms: "You may not notice pregnancy symptoms yet. Some people may experience mild changes around ovulation.",
        activity: "Continue taking care of yourself with nutritious food, enough water, rest, and gentle activity. 💕",
        suggestion: "Learn about fertilization and how the embryo begins its journey toward the uterus. 📖",
        message: "A tiny beginning can become something wonderfully beautiful. 🌷"
    },
    4: {
        title: "Week 4 🌸",
        development: "Around this time, implantation may occur as the developing embryo attaches to the lining of the uterus. Early structures that will support the pregnancy begin developing.",
        size: "The developing embryo is still very tiny, around the size of a poppy seed.",
        symptoms: "Some people may notice tiredness, mild cramping, breast tenderness, or other early changes. Some may have no symptoms yet.",
        activity: "Get enough rest, stay hydrated, and continue eating a balanced diet. 💕",
        suggestion: "Learn about implantation and the early changes happening inside your body. 📖",
        message: "Your little journey is beginning to take shape. 🌷"
    },
    5: {
        title: "Week 5 🌸",
        development: "The embryo is developing rapidly. The early structures that will form the brain, spinal cord, heart, and other organs are beginning to develop.",
        size: "The embryo is about the size of a sesame seed.",
        symptoms: "You may notice tiredness, breast tenderness, nausea, frequent urination, or mood changes. Some people may still have few or no symptoms.",
        activity: "Rest when you need to, drink enough water, and try to eat small, nutritious meals if you feel nauseous. 💕",
        suggestion: "Learn about the early development of the baby's brain, spinal cord, and heart. 📖",
        message: "Little by little, something amazing is growing. 🌷"
    },
    6: {
        title: "Week 6 🌸",
        development: "The embryo is growing quickly. The early brain and spinal cord continue developing, and the heart is beginning to develop and may start beating around this time.",
        size: "The embryo is about the size of a lentil.",
        symptoms: "Nausea, tiredness, tender breasts, frequent urination, and increased sensitivity to smells may occur. Some people may have few symptoms.",
        activity: "Get plenty of rest, drink enough fluids, and choose small nutritious meals if nausea makes eating difficult. 💕",
        suggestion: "Learn about how the baby's heart, brain, and spinal cord develop during this stage. 📖",
        message: "Every tiny change is part of a beautiful journey. 🌷"
    },
    7: {
        title: "Week 7 🌸",
        development: "The embryo continues to grow rapidly. The brain is developing quickly, and early facial features and limb buds are becoming more defined.",
        size: "The embryo is about the size of a blueberry.",
        symptoms: "You may experience nausea, tiredness, tender breasts, frequent urination, or changes in appetite and smell. Symptoms vary from person to person.",
        activity: "Take breaks when you feel tired and keep yourself hydrated. Gentle movement may also help you feel comfortable. 💕",
        suggestion: "Learn about the baby's early brain development and how the arms and legs begin to form. 📖",
        message: "Your journey is growing more beautiful with every week. 🌷"
    },
    8: {
        title: "Week 8 🌸",
        development: "The embryo continues developing rapidly. The arms and legs are becoming more defined, and the facial features continue to develop.",
        size: "The embryo is about the size of a raspberry.",
        symptoms: "Nausea, tiredness, tender breasts, bloating, frequent urination, and sensitivity to smells may occur.",
        activity: "Rest when you need to, drink plenty of water, and try small frequent meals if nausea is bothering you. 💕",
        suggestion: "Learn about the baby's developing limbs and facial features. 📖",
        message: "Tiny beginnings are becoming something truly amazing. 🌷"
    },
    9: {
        title: "Week 9 🌸",
        development: "The embryo is growing quickly. The basic structures of the major organs are developing, and the head is becoming more defined as the face continues to form.",
        size: "The embryo is about the size of a cherry.",
        symptoms: "Nausea, tiredness, mood changes, tender breasts, bloating, and sensitivity to smells may continue.",
        activity: "Get enough rest, stay hydrated, and choose nourishing foods that you can tolerate. 💕",
        suggestion: "Learn about the development of the baby's organs and facial features. 📖",
        message: "Your little one is growing a little more every day. 🌷"
    },
    10: {
        title: "Week 10 🌸",
        development: "The developing baby is growing rapidly. The major organs have started forming, and the fingers and toes are becoming more distinct.",
        size: "The baby is about the size of a strawberry.",
        symptoms: "Nausea, tiredness, tender breasts, bloating, and frequent urination may continue. Some people may begin to feel a little better soon.",
        activity: "Continue getting enough rest, drinking water, and eating balanced meals. 💕",
        suggestion: "Learn about how the baby's fingers, toes, and major organs continue developing. 📖",
        message: "You are already 10 weeks into this beautiful journey. 🌷"
    },
    11: {
        title: "Week 11 🌸",
        development: "The baby continues to grow rapidly. The body is becoming more developed, and the head is still large compared with the rest of the body. Small movements may begin, although you usually cannot feel them yet.",
        size: "The baby is about the size of a lime.",
        symptoms: "Nausea and tiredness may continue, while some people may start feeling more energetic. Constipation, bloating, and headaches can also occur.",
        activity: "Keep drinking water, eat nutritious foods, and give yourself enough time to rest. 💕",
        suggestion: "Learn about the baby's developing body and early movements. 📖",
        message: "You are getting closer to the end of the first trimester. 🌷"
    },

    12: {
        title: "Week 12 🌸",
        development: "The baby's facial features are becoming more defined. The fingers and toes are formed, and the baby can make small movements.",
        size: "The baby is about the size of a plum.",
        symptoms: "Nausea and tiredness may begin to improve for some people. You may still experience bloating, headaches, or breast tenderness.",
        activity: "Continue eating balanced meals, staying hydrated, and getting enough rest. 💕",
        suggestion: "Learn about the baby's developing facial features and movements. 📖",
        message: "Your little one is growing and changing every day. 🌷"
    },

    13: {
        title: "Week 13 🌸",
        development: "The baby continues growing and moving. The bones are beginning to harden, and the baby's vocal cords are starting to develop.",
        size: "The baby is about the size of a peach.",
        symptoms: "For many people, nausea and fatigue may start improving around this time. Appetite may increase as you enter the second trimester.",
        activity: "Celebrate reaching the end of the first trimester. Keep nourishing your body and making time for rest. 💕",
        suggestion: "Learn about the changes that happen as you enter the second trimester. 📖",
        message: "You have completed an important part of your journey. 🌷"
    },
    14: {
        title: "Week 14 🌸",
        development: "The baby's facial muscles are developing, and the baby can make small facial movements. The body is becoming more proportionate as the second trimester begins.",
        size: "The baby is about the size of a lemon.",
        symptoms: "Nausea may continue to improve. You may notice increased energy, a growing appetite, or mild abdominal stretching.",
        activity: "Enjoy gentle activities that make you feel comfortable and continue eating nutritious foods. 💕",
        suggestion: "Learn about the changes happening as your baby enters the second trimester. 📖",
        message: "A new trimester brings new moments to discover. 🌷"
    },

    15: {
        title: "Week 15 🌸",
        development: "The baby's bones continue to develop, and the baby can move its arms and legs. Hair follicles are also developing on the skin.",
        size: "The baby is about the size of an apple.",
        symptoms: "You may feel more energetic. Some people experience a stuffy nose, mild headaches, or changes in their skin.",
        activity: "Keep hydrated, eat balanced meals, and take time to relax and enjoy your growing journey. 💕",
        suggestion: "Learn about how your baby's developing bones, movements, and facial features.You can also talk or sing to your little one 📖",
        message: "Your little one is growing, moving, and changing every day.🌷"
    },
    16: {
        title: "Week 16 🌸",
        development: "The baby's facial features are becoming more developed, and the baby can make movements with the arms and legs. The nervous system continues to mature.",
        size: "The baby is about the size of an avocado.",
        symptoms: "You may feel more energetic, although mild backache, headaches, or nasal congestion can occur.",
        activity: "Continue gentle movement, nutritious meals, good hydration, and plenty of rest. 💕",
        suggestion: "Learn about your baby's developing movements and nervous system. 📖",
        message: "You are moving beautifully through your pregnancy journey. 🌷"
    },
    17: {
        title: "Week 17 🌸",
        development: "Your baby continues to grow and develop. Fat begins to form under the skin, and the bones continue to strengthen.",
        size: "The baby is about the size of a pear.",
        symptoms: "You may notice your belly growing, mild backache, or increased appetite.",
        activity: "Stay hydrated, eat nutritious meals, and take time to rest. 💕",
        suggestion: "Learn about your baby's growing bones and developing body.",
        message: "Every week brings a new little milestone. 🌷"
    },

    18: {
        title: "Week 18 🌸",
        development: "Your baby's ears are developing and the bones of the inner ear are becoming more developed. Your baby may also begin responding to sounds.",
        size: "The baby is about the size of a bell pepper.",
        symptoms:"You may begin noticing your baby's movements around this time, although many first-time mothers feel them later. Early movements can feel like tiny flutters or bubbles.",
        activity: "Try gentle stretching and make sure you get enough rest. 💕",
        suggestion: "Learn about your baby's developing senses.",
        message: "Your little one is discovering more of the world every day. 🌷"
    },

    19: {
        title: "Week 19 🌸",
        development: "Your baby's brain continues developing, and the senses are becoming more refined. A protective coating called vernix begins covering the skin.",
        size: "The baby is about the size of a mango.",
        symptoms: "You may notice growing belly size, mild aches, or skin changes.",
        activity: "Wear comfortable clothing and stay hydrated. 💕",
        suggestion: "Learn about your baby's developing senses and skin.",
        message: "Halfway there is getting closer! 🌷"
    },

    20: {
        title: "Week 20 🌸",
         development:"Your baby continues to move actively, and you may start noticing these movements more clearly. The movements can feel like gentle flutters, taps, or small kicks.",
        size: "The baby is about the size of a banana.",
        symptoms: "You may notice increased belly size, backache, or leg cramps.",
        activity: "Take some time to relax and celebrate reaching this milestone. 💕",
        suggestion: "Learn about the changes happening around the halfway point.",
        message: "Halfway through your beautiful journey! 🌷"
    },

    21: {
        title: "Week 21 🌸",
        development: "Your baby continues to grow and develop muscles and coordination. The digestive system is also developing.",
        size: "The baby is about the size of a carrot.",
        symptoms: "You may experience heartburn, backache, or increased appetite.",
        activity: "Eat balanced meals and rest whenever you need to. 💕",
        suggestion: "Learn about your baby's developing digestive system.",
        message: "Your journey continues one precious week at a time. 🌷"
    },

    22: {
        title: "Week 22 🌸",
        development: "Your baby's facial features continue developing, and the senses continue to mature. Your baby is becoming more active.",
        size: "The baby is about the size of a papaya.",
        symptoms: "You may notice backache, leg cramps, or skin changes.",
        activity: "Stay active in ways that feel comfortable and get plenty of rest. 💕",
        suggestion: "Learn about your baby's developing senses.",
        message: "Your little one is growing stronger every day. 🌷"
    },

    23: {
        title: "Week 23 🌸",
        development: "Your baby's hearing continues developing, and your baby may respond to sounds. The lungs are also continuing to develop.",
        size: "The baby is about the size of a grapefruit.",
        symptoms: "You may experience swelling, backache, or heartburn.",
        activity: "Stay hydrated and take breaks when you feel tired. 💕",
        suggestion: "Talk, read, or sing softly if you enjoy connecting with your baby.",
        message: "Your voice may become a familiar sound to your little one. 🌷"
    },

    24: {
        title: "Week 24 🌸",
        development: "Your baby's lungs continue developing, and the brain is growing rapidly. Your baby can respond to sounds and movement.",
        size: "The baby is about the size of an ear of corn.",
        symptoms: "Heartburn, backache, leg cramps, and swelling may occur.",
        activity: "Rest comfortably and keep drinking enough water. 💕",
        suggestion: "Learn about your baby's developing lungs and brain.",
        message: "You are growing together, one day at a time. 🌷"
    },

    25: {
        title: "Week 25 🌸",
        development: "Your baby's brain continues to develop, and the lungs are becoming more mature. Your baby's movements may feel stronger.",
        size: "The baby is about the size of a rutabaga.",
        symptoms: "You may notice backache, heartburn, leg cramps, or trouble sleeping.",
        activity: "Use pillows for comfort and take regular rest breaks. 💕",
        suggestion: "Learn about your baby's brain and lung development.",
        message: "Your little one is getting stronger every day. 🌷"
    },

    26: {
        title: "Week 26 🌸",
        development: "Your baby's eyes are developing further and may begin to open soon. The nervous system continues to mature.",
        size: "The baby is about the size of a zucchini.",
        symptoms: "You may experience heartburn, swelling, backache, or sleep changes.",
        activity: "Stay hydrated and find comfortable positions for resting. 💕",
        suggestion: "Learn about your baby's developing eyes and nervous system.",
        message: "Another beautiful milestone reached. 🌷"
    },

    27: {
        title: "Week 27 🌸",
        development: "You are approaching the third trimester. Your baby's brain continues developing and the lungs continue maturing.",
        size: "The baby is about the size of a cauliflower.",
        symptoms: "Fatigue, backache, heartburn, and swelling may occur.",
        activity: "Give yourself plenty of rest and continue gentle movement if comfortable. 💕",
        suggestion: "Learn about the changes as you approach the third trimester.",
        message: "You are getting closer to meeting your little one. 🌷"
    },

    28: {
        title: "Week 28 🌸",
        development: "Your baby continues gaining weight and developing the brain and nervous system. The eyes can open and close.",
        size: "The baby is about the size of an eggplant.",
        symptoms: "You may experience backache, heartburn, swelling, or difficulty sleeping.",
        activity: "Rest when needed and keep up healthy daily habits. 💕",
        suggestion: "Learn about your baby's developing brain and senses.",
        message: "Welcome to the third trimester! 🌷"
    },

    29: {
        title: "Week 29 🌸",
        development: "Your baby's muscles and lungs continue developing. The baby is also gaining more body fat.",
        size: "The baby is about the size of a butternut squash.",
        symptoms: "You may notice stronger movements, backache, heartburn, or tiredness.",
        activity: "Take regular breaks and find comfortable ways to rest. 💕",
        suggestion: "Learn about your baby's growing muscles and lungs.",
        message: "Your little one is getting ready for the world. 🌷"
    },

    30: {
        title: "Week 30 🌸",
        development: "Your baby's brain continues developing rapidly, and the baby continues gaining weight and practicing breathing movements.",
        size: "The baby is about the size of a large cabbage.",
        symptoms: "Heartburn, backache, swelling, and tiredness may become more noticeable.",
        activity: "Prioritize rest, hydration, and nutritious meals. 💕",
        suggestion: "Learn about your baby's brain development.",
        message: "Only a little more of the journey remains. 🌷"
    },

    31: {
        title: "Week 31 🌸",
        development: "Your baby's brain and nervous system continue maturing. The baby is gaining weight and becoming stronger.",
        size: "The baby is about the size of a coconut.",
        symptoms: "You may experience shortness of breath, heartburn, backache, or tiredness.",
        activity: "Rest comfortably and avoid pushing yourself when tired. 💕",
        suggestion: "Learn about your baby's continued growth and development.",
        message: "Your little one is growing stronger every day. 🌷"
    },

    32: {
        title: "Week 32 🌸",
        development: "Your baby continues gaining weight and developing the brain and lungs. Movements may feel stronger but can vary as space becomes limited.",
        size: "The baby is about the size of a squash.",
        symptoms: "Backache, heartburn, swelling, and sleep difficulties may occur.",
        activity: "Keep yourself comfortable, hydrated, and well rested. 💕",
        suggestion: "Start thinking about preparations for the final weeks.",
        message: "The big meeting day is getting closer. 🌷"
    },

    33: {
        title: "Week 33 🌸",
        development: "Your baby's bones continue hardening while the skull remains flexible to help with birth. The brain continues developing.",
        size: "The baby is about the size of a pineapple.",
        symptoms: "You may experience tiredness, backache, heartburn, or increased urination.",
        activity: "Rest whenever possible and continue eating nutritious foods. 💕",
        suggestion: "Learn about your baby's brain and bone development.",
        message: "You are entering the final stretch. 🌷"
    },

    34: {
        title: "Week 34 🌸",
        development: "Your baby's lungs and nervous system continue maturing. Your baby continues gaining fat and weight.",
        size: "The baby is about the size of a cantaloupe.",
        symptoms: "Pelvic pressure, backache, heartburn, and tiredness may occur.",
        activity: "Take things at a comfortable pace and get plenty of rest. 💕",
        suggestion: "Review what you may want to prepare for the baby's arrival.",
        message: "Your little one is getting ready to meet you. 🌷"
    },

    35: {
        title: "Week 35 🌸",
        development: "Your baby's organs continue maturing, and the baby continues gaining weight. The kidneys and liver are functioning.",
        size: "The baby is about the size of a honeydew melon.",
        symptoms: "You may notice increased pelvic pressure, frequent urination, backache, or tiredness.",
        activity: "Rest often and keep your essentials ready for the coming weeks. 💕",
        suggestion: "Begin reviewing your hospital bag checklist.",
        message: "The final weeks are here. 🌷"
    },

    36: {
        title: "Week 36 🌸",
        development: "Your baby continues gaining weight and preparing for birth. The lungs and other organs continue maturing.",
        size: "The baby is about the size of a head of romaine lettuce.",
        symptoms: "You may experience increased pelvic pressure, backache, and frequent urination.",
        activity: "Keep resting and stay prepared for your baby's arrival. 💕",
        suggestion: "Check that your hospital bag and important essentials are ready.",
        message: "Your meeting day is getting very close. 🌷"
    },

    37: {
        title: "Week 37 🌸",
        development: "Your baby continues growing and gaining weight. The baby is getting ready for life outside the womb.",
        size: "The baby is about the size of a bunch of Swiss chard.",
        symptoms: "You may notice increased pelvic pressure, contractions, or changes as your body prepares for birth.",
        activity: "Rest when possible and keep your essentials nearby. 💕",
        suggestion: "Review your birth preferences and hospital bag.",
        message: "Your little one may be meeting you soon. 🌷"
    },

    38: {
        title: "Week 38 🌸",
        development: "Your baby continues gaining weight and developing while preparing for birth. The organs continue functioning and maturing.",
        size: "The baby is about the size of a leek.",
        symptoms: "Pelvic pressure, backache, frequent urination, and changes in contractions may occur.",
        activity: "Stay comfortable, rest, and keep in touch with your healthcare provider as advised. 💕",
        suggestion: "Make sure your hospital bag and important items are ready.",
        message: "The wait is almost over. 🌷"
    },

    39: {
        title: "Week 39 🌸",
        development: "Your baby is continuing to gain weight and is preparing for birth. Most major development is complete, while the baby continues to mature.",
        size: "The baby is about the size of a small watermelon.",
        symptoms: "You may notice increased pelvic pressure, contractions, backache, or changes in discharge.",
        activity: "Rest, stay hydrated, and keep your hospital essentials ready. 💕",
        suggestion: "Review your hospital bag and birth-day essentials.",
        message: "Your beautiful meeting is almost here. 🌷"
    },

    40: {
        title: "Week 40 🌸",
        development: "This is the traditional estimated due-date week. Your baby is fully developed and ready for life outside the womb.",
        size: "Your baby is around the size of a small pumpkin, although size varies.",
        symptoms: "You may experience contractions, pelvic pressure, backache, or other signs that labor may be approaching.",
        activity: "Rest, stay hydrated, and follow the guidance of your healthcare provider. 💕",
        suggestion: "Keep your hospital bag ready and review your plan for contacting your healthcare provider.",
        message: "You've made it to Week 40. What an incredible journey! 🌷"
    }
};


// Create 40 weeks
const weeksContainer = document.getElementById("weeksContainer");

for (let week = 1; week <= 40; week++) {

    const weekCard = document.createElement("div");
    weekCard.id = "week-" + week;

    weekCard.classList.add("week-card");


    if (week <= currentWeek) {

        weekCard.innerHTML = `
            <h2>Week ${week} 🌸</h2>

            <p>Your Week ${week} journey is available.</p>

            <button onclick="openWeek(${week})">
                Explore Week ${week}
            </button>
        `;

    } else {

        weekCard.classList.add("locked");

        weekCard.innerHTML = `
            <h2>Week ${week} 🔒</h2>

            <p>This week is locked.</p>
        `;
    }


    weeksContainer.appendChild(weekCard);
}
setTimeout(function() {
    const currentWeekCard = document.getElementById("week-" + currentWeek);

    if (currentWeekCard) {
        currentWeekCard.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}, 100);


// Open week
function openWeek(week) {

    const data = weekData[week];

    if (!data) {
        alert("Content for Week " + week + " is coming soon.");
        return;
    }

    weeksContainer.innerHTML = `
    <div class="week-content">

        <h2>${data.title}</h2>

        <h3>👶 Baby Development</h3>
        <p>${data.development}</p>

        <h3>🍓 Baby Size</h3>
        <p>${data.size}</p>

        <h3>🤰 Symptoms & Body Changes</h3>
        <p>${data.symptoms}</p>

        <h3>💕 Happiness & Self-Care</h3>
        <p>${data.activity}</p>

        <h3>📖 Reading & Creative Idea</h3>
        <p>${data.suggestion}</p>

        <h3>💬 Positive Message</h3>
        <p>${data.message}</p>

        <button class="back-to-weeks" onclick="showAllWeeks()">
            ← Back to Weekly Page
        </button>

    </div>
`;

    // Hospital bag popup from Week 36 onwards
    if (week >= 36) {

        const hospitalBagPopup = document.createElement("div");

        hospitalBagPopup.classList.add("hospital-popup");

        hospitalBagPopup.innerHTML = `
            <div class="popup-box">

                <h2>👜 It's time for your hospital bag!</h2>

                <p>
                    You're getting closer to meeting your little one. 💕
                    Start preparing the things you may need for your hospital stay.
                </p>

                <button onclick="window.location.href='hospital-bag.html'">
                    Go to Hospital Bag
                </button>

                <button class="close-btn"
                    onclick="this.closest('.hospital-popup').remove()">
                    Close
                </button>

            </div>
        `;

        document.body.appendChild(hospitalBagPopup);
    }
}
function showAllWeeks() {

    weeksContainer.innerHTML = "";

    for (let week = 1; week <= 40; week++) {

        const weekCard = document.createElement("div");

        weekCard.id = "week-" + week;
        weekCard.classList.add("week-card");

        if (week <= currentWeek) {

            weekCard.innerHTML = `
                <h2>Week ${week} 🌸</h2>
                <p>Your Week ${week} journey is available.</p>

                <button onclick="openWeek(${week})">
                    Explore Week ${week}
                </button>
            `;

        } else {

            weekCard.classList.add("locked");

            weekCard.innerHTML = `
                <h2>Week ${week} 🔒</h2>
                <p>This week is locked.</p>
            `;
        }

        weeksContainer.appendChild(weekCard);
    }

    setTimeout(function() {

        const currentWeekCard =
            document.getElementById("week-" + currentWeek);

        if (currentWeekCard) {
            currentWeekCard.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

    }, 100);
}
function changePassword() {

    const currentUser = JSON.parse(
        localStorage.getItem("currentUser")
    );

    if (!currentUser) {
        alert("No user is logged in.");
        return;
    }

    const newPassword = prompt("Enter your new password:");

    if (!newPassword) {
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const userIndex = users.findIndex(function(user) {
        return user.email === currentUser.email;
    });

    if (userIndex === -1) {
        alert("User account not found.");
        return;
    }

    users[userIndex].password = newPassword;

    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem(
        "currentUser",
        JSON.stringify(users[userIndex])
    );

    alert("Password changed successfully! 🔐");
}

function toggleAccountMenu() {

    const dropdown = document.getElementById("accountDropdown");

    dropdown.classList.toggle("show");

    const savedUser = localStorage.getItem("currentUser");

    if (savedUser) {

        const user = JSON.parse(savedUser);

        document.getElementById("accountEmail").textContent =
            "📧 " + user.email;
    }
}
function logout() {

    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");

    window.location.href = "login.html";
}