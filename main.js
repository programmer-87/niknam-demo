    // آرایه‌ای برای نگه داشتن محصولات انتخاب شده
    let cart = [];

    // ۱. تابعی که هنگام کلیک روی سبد خرید اجرا میشه (هوشمند)
    function addToCart(name, price) {
      // چک می‌کنیم آیا محصولی با این نام از قبل وجود داره یا نه
      const existingItem = cart.find(item => item.name === name);

      if (existingItem) {
        // اگر وجود داشت، فقط تعدادش رو یکی زیاد می‌کنیم
        existingItem.quantity += 1;
      } else {
        // اگر وجود نداشت، محصول جدید با تعداد ۱ اضافه میشه
        cart.push({ name, price, quantity: 1 });
      }
      
      updateCartUI();
      
      // اسکرول نرم به بخش فرم
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    }

    // ۲. آپدیت کردن لیست نمایش داده شده در فرم
    function updateCartUI() {
      const container = document.getElementById('cart-items-container');
      const list = document.getElementById('cart-list');
      
      if (cart.length > 0) {
        container.classList.remove('hidden');
        list.innerHTML = ''; // پاک کردن لیست قبلی
        
        cart.forEach((item, index) => {
          const totalPriceForItem = item.price * item.quantity;
          
          list.innerHTML += `
            <li class="flex justify-between items-center bg-white/5 p-3 border border-white/10 rounded-sm">
              <div class="flex items-center gap-3">
                <span class="text-white">${item.name}</span>
                <!-- نمایش تعداد کنار اسم محصول -->
                <span class="text-xs bg-gold text-black px-2 py-0.5 rounded font-bold">${item.quantity} عدد</span>
              </div>
              <span class="text-gold text-sm" dir="ltr">${totalPriceForItem.toLocaleString()} تومان</span>
            </li>
          `;
        });
      } else {
        container.classList.add('hidden');
      }
    }

    // ۳. مدیریت ثبت فرم
    document.getElementById('order-form').addEventListener('submit', function(e) {
      e.preventDefault(); // جلوگیری از رفرش شدن صفحه

      if (cart.length === 0) {
        alert('لطفاً ابتدا محصولی را انتخاب کنید.');
        return;
      }

      // گرفتن اطلاعات فرم
      const name = document.getElementById('cust-name').value;
      const phone = document.getElementById('cust-phone').value;
      const address = document.getElementById('cust-address').value;

      // ساخت متن سفارش
      let orderText = `--- سفارش جدید ---\n`;
      orderText += `نام: ${name}\n`;
      orderText += `شماره تماس: ${phone}\n`;
      orderText += `آدرس: ${address}\n\n`;
      orderText += `محصولات:\n`;
      
      let total = 0;
      cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        // نوشتن تعداد در فایل خروجی
        orderText += `- ${item.name} (${item.quantity} عدد) : ${itemTotal.toLocaleString()} تومان\n`;
      });
      
      orderText += `\nمجموع کل: ${total.toLocaleString()} تومان\n`;
      orderText += `تاریخ: ${new Date().toLocaleString('fa-IR')}\n`;

      // ساخت فایل متنی و دانلود خودکار
      const blob = new Blob([orderText], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `order-${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // پیام موفقیت و خالی کردن سبد
      alert('سفارش شما با موفقیت ثبت شد! فایل سفارش برای شما دانلود شد.');
      
      cart = []; // خالی کردن سبد
      updateCartUI();
      this.reset(); // خالی کردن فرم
    });


    const logoContainer = document.getElementById('logo-container');
    
    function createFlyingText() {
      if(!logoContainer) return; // اگر کادر پیدا نشد، کد ارور نده

      const textElement = document.createElement('span');
      textElement.className = 'flying-text';
      textElement.innerText = 'نیک‌نام'; 
      
      logoContainer.appendChild(textElement);
      
      setTimeout(() => {
        textElement.remove();
      }, 2000);
    }

    // هر ۱.۸ ثانیه یک بار متن رو پرتاب کن
    setInterval(createFlyingText, 1800);