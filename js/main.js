document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const bgWall = document.getElementById('bg-wall');
    const welcomeScreen = document.getElementById('welcome-screen');
    const memoryScreen = document.getElementById('memory-screen');
    const memoryContainer = document.querySelector('.memory-scroll-container');
    const btnToGifts = document.getElementById('btn-to-gifts');
    const mainScreen = document.getElementById('main-screen');
    const envelope = document.getElementById('envelope');
    const letter = document.getElementById('letter');
    const btnEnter = document.getElementById('btn-enter');
    const giftList = document.getElementById('gift-list');

    const confirmModal = document.getElementById('confirm-modal');
    const confirmGiftName = document.getElementById('confirm-gift-name');
    const btnCancelConfirm = document.getElementById('btn-cancel-confirm');
    const btnSubmitConfirm = document.getElementById('btn-submit-confirm');

    const customModal = document.getElementById('custom-modal');
    const customInput = document.getElementById('custom-input');
    const btnCustomGift = document.getElementById('btn-custom-gift');
    const btnCancelCustom = document.getElementById('btn-cancel-custom');
    const btnSubmitCustom = document.getElementById('btn-submit-custom');

    const btnFinish = document.getElementById('btn-finish');
    const finalScreen = document.getElementById('final-screen');
    const btnGallery = document.getElementById('btn-gallery');

    const galleryScreen = document.getElementById('gallery-screen');
    const galleryContainer = document.getElementById('gallery-container');
    const messageInput = document.getElementById('message-input');
    const btnSendMessage = document.getElementById('btn-send-message');
    const btnBackToHome = document.getElementById('btn-back-to-home');

    const toast = document.getElementById('toast');

    // --- State ---
    let selectedGift = "";

    // Initialize EmailJS with your Public Key
    emailjs.init("8FpKE1LjIxhbjC_5O");

    const EMAILJS_SERVICE_ID = "service_y06z3l6";
    const EMAILJS_TEMPLATE_ID = "template_evme7o9";

    // --- Gift Data ---
    const gifts = [
        { id: 'gift_1', name: '大罐眼霜面霜（用不完）', img: 'cream.jpg' },
        { id: 'gift_2', name: '黑胶唱片 (唱片机)', img: 'vinyl.jpg' },
        { id: 'gift_3', name: '番茄口袋毛绒小狗包', img: 'dog_plush.jpg' },
        { id: 'gift_4', name: 'INTO YOU', img: 'lip.jpg' },
        { id: 'gift_5', name: '精选美甲色层', img: 'nail.jpg' },
        { id: 'gift_6', name: '地球宝藏 矿石盲盒', img: 'ore.jpg' },
        { id: 'gift_7', name: '小狗狗粮营养包', img: 'dog_food.jpg' },
        { id: 'gift_8', name: '日式风景大马士革手链配套项链', img: 'necklace.jpg' },
        { id: 'gift_9', name: '还没挑好的斜挎包', img: 'bag.jpg' },
        { id: 'gift_10', name: '复合维生素（每天早上吃）', img: 'vitamin.jpg' },
        { id: 'gift_11', name: '零食：良品铺子自选/大礼包', img: 'snacks1.jpg' },
        { id: 'gift_12', name: '山姆各类零食饮料水', img: 'sam.jpg' },
        { id: 'gift_13', name: '(高价值) 白色恋人、金沙巧克力', img: 'choco.jpg' },
        { id: 'gift_14', name: '好吃的饭（元宵汤圆）', img: 'food.jpg' },
        { id: 'gift_15', name: '墨镜（你好像已经买辣）', img: 'sunglasses.jpg' },
        { id: 'gift_16', name: '一辆布加迪威龙 (做梦版)', img: 'bujiadiweilong.jpg' },
        { id: 'gift_17', name: '海景大别墅一栋 (附首付与房贷)', img: 'haijingdabieshu.jpg' },
        { id: 'gift_18', name: '无论如何一直在一起特权 (不可退换)', img: '在一起.jpg' },
        { id: 'gift_19', name: '专属无条件使唤男友券', img: 'shihuan.jpg' },
        { id: 'gift_20', name: '画大饼专属黑卡 (余额无限)', img: 'heika.jpg' },
        { id: 'gift_21', name: '徒手摘星星服务', img: 'zhaixingxing.jpg' }
    ];

    // --- Initialization ---

    // 1. Generate Background Photos
    for (let i = 0; i < 12; i++) {
        const photo = document.createElement('div');
        photo.className = 'bg-photo';

        // Random positioning and rotation
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const rot = (Math.random() - 0.5) * 60; // -30deg to 30deg
        const delay = Math.random() * 10;

        photo.style.left = `${left}vw`;
        photo.style.top = `${top}vh`;
        photo.style.setProperty('--rot', `${rot}deg`);
        photo.style.animationDelay = `${delay}s`;

        // Placeholder image mapping to 1.jpg, 2.jpg... up to 6.jpg (looping)
        const imgIndex = (i % 6) + 1;

        // HTML structure for photo
        photo.innerHTML = `<img src="assets/images/photo_${imgIndex}.jpg" alt="memory" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'100\\' height=\\'100\\'><rect width=\\'100\\' height=\\'100\\' fill=\\'%23333\\' /></svg>'">`;

        bgWall.appendChild(photo);
    }

    // 2. Render Gifts
    gifts.forEach(gift => {
        const card = document.createElement('div');
        card.className = 'gift-card';
        card.onclick = () => openConfirmModal(gift.name);

        card.innerHTML = `
            <div class="gift-img" style="background-image: url('assets/images/gifts/${gift.img}')"></div>
            <div class="gift-info">
                <span class="gift-name">${gift.name}</span>
            </div>
        `;
        giftList.appendChild(card);
    });

    // 3. Render Gallery Photos
    for (let i = 1; i <= 6; i++) {
        const photoWrapper = document.createElement('div');
        photoWrapper.className = 'gallery-photo';
        // Random slight rotation via CSS var
        const rotation = (Math.random() - 0.5) * 8;
        photoWrapper.style.setProperty('--rand-rot', rotation);

        photoWrapper.innerHTML = `
            <img src="assets/images/photo_${i}.jpg" alt="memory" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'300\\' height=\\'400\\'><rect width=\\'100%\\' height=\\'100%\\' fill=\\'%233a2230\\' /></svg>'">
        `;
        galleryContainer.appendChild(photoWrapper);
    }

    // --- Interactions ---

    // Open Envelope
    envelope.addEventListener('click', () => {
        if (!envelope.classList.contains('open')) {
            envelope.classList.add('open');
            setTimeout(() => {
                envelope.style.opacity = '0';
                envelope.style.pointerEvents = 'none';
                letter.classList.add('show');
            }, 600);
        }
    });

    // Enter Memory Screen
    btnEnter.addEventListener('click', () => {
        letter.classList.remove('show');
        welcomeScreen.classList.remove('active');
        welcomeScreen.classList.add('hidden');

        setTimeout(() => {
            memoryScreen.classList.remove('hidden');
            memoryScreen.classList.add('active');
        }, 800);
    });

    // Enter Main Screen (Gifts)
    btnToGifts.addEventListener('click', () => {
        memoryScreen.classList.remove('active');
        memoryScreen.classList.add('hidden');

        // Launch Confetti
        fireConfetti();

        setTimeout(() => {
            mainScreen.classList.remove('hidden');
            mainScreen.classList.add('active');
        }, 800);
    });

    // Open Confirm Modal
    function openConfirmModal(giftName) {
        selectedGift = giftName;
        confirmGiftName.textContent = `[ ${giftName} ]`;
        confirmModal.classList.remove('hidden');
    }

    // Close Confirm Modal
    btnCancelConfirm.addEventListener('click', () => {
        confirmModal.classList.add('hidden');
    });

    // Submit Gift (The "Bug" allows infinite submits)
    btnSubmitConfirm.addEventListener('click', () => {
        sendEmailJS(selectedGift);
        confirmModal.classList.add('hidden');
        showToastMsg("礼物需求已经发至1832652154@qq.com！"); // NO MORE CONFETTI HERE
    });

    // Open Custom Modal
    btnCustomGift.addEventListener('click', () => {
        customInput.value = '';
        customModal.classList.remove('hidden');
    });

    // Close Custom Modal
    btnCancelCustom.addEventListener('click', () => {
        customModal.classList.add('hidden');
    });

    // Submit Custom Gift
    btnSubmitCustom.addEventListener('click', () => {
        const val = customInput.value.trim();
        if (val) {
            sendEmailJS(`[自选礼物]: ${val}`);
            customModal.classList.add('hidden');
            showToastMsg("礼物需求已经发至1832652154@qq.com！");
        } else {
            alert('请先输入想要的礼物哦~');
            customInput.focus();
        }
    });

    // Finish Selection
    btnFinish.addEventListener('click', () => {
        window.scrollTo(0, 0);
        mainScreen.classList.remove('active');
        mainScreen.classList.add('hidden');

        setTimeout(() => {
            finalScreen.classList.remove('hidden');
            finalScreen.classList.add('active');
        }, 800);
    });

    // Go to Gallery
    btnGallery.addEventListener('click', () => {
        window.scrollTo(0, 0);
        finalScreen.classList.remove('active');
        finalScreen.classList.add('hidden');

        // Remove bg-wall to let gallery shine more clearly? or keep it
        bgWall.style.opacity = '0';

        setTimeout(() => {
            galleryScreen.classList.remove('hidden');
            galleryScreen.classList.add('active');
        }, 800);
    });

    // Send Message from Gallery
    btnSendMessage.addEventListener('click', () => {
        const val = messageInput.value.trim();
        if (val) {
            btnSendMessage.textContent = "发送中...";
            btnSendMessage.disabled = true;

            const templateParams = {
                title: "收到了一段想说的话！",
                name: "专属回忆回响",
                message: val,
                time: new Date().toLocaleString()
            };

            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
                .then(function (response) {
                    btnSendMessage.textContent = "已发送成功 💌";
                    showToastMsg("信件已成功发送！");
                }, function (error) {
                    btnSendMessage.textContent = "一键发送邮件 💌";
                    btnSendMessage.disabled = false;
                    alert("发送失败，请稍后再试。");
                    console.error('FAILED...', error);
                });
        } else {
            alert('请先写下想说的话哦~');
            messageInput.focus();
        }
    });

    // Back to home from gallery (Go to letter)
    btnBackToHome.addEventListener('click', () => {
        window.scrollTo(0, 0);
        if (memoryContainer) memoryContainer.scrollTop = 0; // reset scroll
        btnSendMessage.textContent = "一键发送邮件 💌";
        btnSendMessage.disabled = false;
        messageInput.value = ""; // clear message

        galleryScreen.classList.remove('active');
        galleryScreen.classList.add('hidden');

        bgWall.style.opacity = '1';

        setTimeout(() => {
            welcomeScreen.classList.remove('hidden');
            welcomeScreen.classList.add('active');
            // Ensure letter modal is shown
            letter.classList.add('show');
        }, 800);
    });

    // --- Utility Functions ---

    function fireConfetti() {
        const duration = 3000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#8c1c2a', '#d1bba4', '#ffffff']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#8c1c2a', '#d1bba4', '#ffffff']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }

    function showToastMsg(msg) {
        toast.textContent = msg;
        toast.classList.remove('hidden');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
    }

    // Send Data silently via EmailJS
    function sendEmailJS(giftValue) {
        // Prepare template parameters matching the EmailJS template: {{title}}, {{name}}, {{time}}, {{message}}
        const templateParams = {
            title: "收到了新的生日礼物选择！",
            name: "生日愿望小助手",
            message: `选中的礼物是: ${giftValue}`,
            time: new Date().toLocaleString()
        };

        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function (error) {
                console.error('FAILED...', error);
                // Even if it errors out, we don't break the user experience
            });
    }
});
