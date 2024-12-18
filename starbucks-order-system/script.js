document.addEventListener('DOMContentLoaded', () => {
    const menu = [
        { name: '아메리카노', price: 4100, image: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[94]_20210430103337006.jpg' },
        { name: '카페라떼', price: 4600, image: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[128692]_20210426091933665.jpg' },
        { name: '카푸치노', price: 4600, image: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[38]_20210415154821846.jpg' },
        { name: '카라멜 마끼아또', price: 5800, image: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[126197]_20210415154609863.jpg' },
        { name: '자바 칩 프라푸치노', price: 6300, image: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[168016]_20210415154152122.jpg' },
        { name: '딸기 요거트 블렌디드', price: 6300, image: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000003276]_20210416154001403.jpg' },
    ];

    let order = {};
    let totalPrice = 0;

    const menuContainer = document.getElementById('menu');
    const orderList = document.getElementById('order-list');
    const totalPriceElement = document.getElementById('total-price');
    const submitOrderButton = document.getElementById('submit-order');

    // 메뉴 추가 반복문문
    menu.forEach((item, index) => {
        const menuItem = document.createElement("div");
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `
        <img class='menu-img' src=${item.image} alt='${item.name}'><br>
        <span class='menu-name'>${item.name}</span><br>
        <span class='menu-price'>₩${item.price}</span><br>
        <button data-index=${index}>주문 추가</button>
        `;
        menuContainer.appendChild(menuItem);
    });

    // 메뉴 클릭 이벤트
    menuContainer.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const index = event.target.getAttribute('data-index');
            const selectedItem = menu[index];
            // 주문 추가 로직
            if (!order[selectedItem.name]) {
                order[selectedItem.name] = { ...selectedItem, quantity: 1 };
            } else {
                order[selectedItem.name].quantity++;
            }
            // 총 가격 업데이트 및 주문 목록 갱신
            totalPrice += selectedItem.price;
            updateOrderList();
        }
    });

    // 주문 내역 업데이트 함수
    function updateOrderList() {
        orderList.innerHTML = '';
        for (let itemName in order) {
            const orderItem = order[itemName];
            const orderItemElement = document.createElement('li');
            orderItemElement.innerHTML = `
                ${itemName} - ₩${orderItem.price.toLocaleString()} x${orderItem.quantity}
                <button class="remove" data-item="${itemName}">삭제</button>
            `;
            orderList.appendChild(orderItemElement);
        }
        totalPriceElement.textContent = totalPrice.toLocaleString();
    }

    // 아이템 삭제 로직
    orderList.addEventListener('click', (event) => {
        const itemName = event.target.getAttribute('data-item');
        if (event.target.classList.contains('remove')) {
            totalPrice -= order[itemName].price * order[itemName].quantity;
            delete order[itemName];
            updateOrderList();
        }
    });

    // 주문 제출 로직
    submitOrderButton.addEventListener('click', () => {
        if (Object.keys(order).length > 0) {
            alert('주문해 주셔서 감사합니다!');
            order = {};
            totalPrice = 0;
            updateOrderList();
        } else {
            alert('주문 내역이 비어 있습니다!');
        }
    });
});

