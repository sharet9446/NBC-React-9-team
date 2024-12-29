document.addEventListener('DOMContentLoaded', () => {
    const menu = [
        { name: '아메리카노', price: 4100, image: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[94]_20210430103337006.jpg'},
        { name: '카페라떼', price: 4600, image: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[128692]_20210426091933665.jpg'},
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

    menu.forEach((item, index) => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="menu-image">
            <div class="menu-info">
                <span class="menu-name">${item.name}</span>
                <span class="menu-price">₩${item.price.toLocaleString()}</span>
                <button data-index="${index}">주문 추가</button>
            </div>
        `;
        menuContainer.appendChild(menuItem);
    });


    // 메뉴 클릭 이벤트
    menuContainer.addEventListener('click', (event) => {
        // 메뉴 컨테이너 영역에서 클릭 이벤트를 감지
        if (event.target.tagName === 'BUTTON') {
             // 클릭된 요소가 버튼인지 확인 (다른 요소 클릭 시 무시)
            const index = event.target.getAttribute('data-index');
            // 클릭된 버튼의 'data-index' 값을 가져와 저장
            const selectedItem = menu[index];
            // 'menu' 배열에서 해당 인덱스에 해당하는 메뉴 아이템을 선택
            if (!order[selectedItem.name]) {
                // 선택된 아이템이 이미 주문 내역에 있는지 확인
                order[selectedItem.name] = { ...selectedItem, quantity: 1 };
                // 없다면 새로 추가하고, 가격과 초기 수량(1)을 설정
            } else {
                order[selectedItem.name].quantity++;
            }   //이미 있으면 수량(quantity)을 1 증가
            
            totalPrice += selectedItem.price;
            //총 가격에 선택된 아이템의 가격을 더함
            updateOrderList();
            // 주문 내역 업데이트하는 함수 호출
        }
    });

    // 주문 내역 업데이트 함수
    function updateOrderList() {
        orderList.innerHTML = '';
        for (let itemName in order) {
            const orderItem = order[itemName];
            const orderItemElement = document.createElement('li');
            orderItemElement.className = 'list-item'; //css 구분을 위해 추가 _문효진
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
            
            // 영수증 생성
            let receipt = '주문 내역\n';
            receipt += '---------------------\n';
            for (let itemName in order) {
                const orderItem = order[itemName];
                receipt += `${itemName} - ₩${orderItem.price} x${orderItem.quantity}\n`;
            }
            receipt += '---------------------\n';
            receipt += `총 가격: ₩${totalPrice}\n`;
            receipt += '감사합니다!';
    
            // 영수증을 alert로 표시
            alert(receipt);
    
            // 주문 초기화
            order = {};
            totalPrice = 0;
            updateOrderList();
        } else {
            alert('주문 내역이 비어 있습니다!');
        }
    });
});

