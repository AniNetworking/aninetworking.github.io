document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('cookiesAccepted')) {
        let cookiePopup = document.createElement('div');
        cookiePopup.innerHTML = `
            <div style="position: fixed; bottom: 10px; left: 10px; right: 10px; background: #fff; padding: 20px; box-shadow: 0 0 10px rgba(0,0,0,0.5); z-index: 1000;">
                <p>We use cookies to improve your experience on our site. By using our site, you consent to cookies.</p>
                <button id="acceptCookies">Accept</button>
            </div>
        `;
        document.body.appendChild(cookiePopup);

        document.getElementById('acceptCookies').addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'true');
            document.body.removeChild(cookiePopup);
        });
    }
});