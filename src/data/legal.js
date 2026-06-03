// Privacy / imprint / cookie modal content (EN + NL).
export const LEGAL={
  en:{
    privacy:`<h3>Privacy Policy</h3>
      <p>This portfolio website respects your privacy and complies with the EU General Data Protection Regulation (GDPR).</p>
      <h4>Controller</h4><p>Myrat Daniyarov, Haarlem, Netherlands. Contact: <a id="lgEmail" href="#">email</a>.</p>
      <h4>What data we process</h4>
      <ul>
        <li>This site does <strong>not</strong> collect personal data, does not use analytics, and does not place advertising or third-party tracking cookies.</li>
        <li>Local storage in your browser is used only to remember your language choice and any text you edit in the admin panel. This data never leaves your device and is not sent to any server.</li>
        <li>If you contact us by phone or email, you do so voluntarily; that data is used solely to respond to your message.</li>
      </ul>
      <h4>External resources</h4><p>Fonts are loaded from Google Fonts. When the page loads, your browser may send your IP address to Google. See Google's privacy policy for details. No other external services are used.</p>
      <h4>Your rights</h4><p>Under the GDPR you have the right to access, rectify, erase, restrict and port your data, and to object to processing. You can clear all locally stored data at any time via "Cookie settings" → Decline, or by clearing your browser storage.</p>
      <h4>Contact</h4><p>For any privacy request, email <a id="lgEmail2" href="#">the controller</a>.</p>`,
    imprint:`<h3>Imprint</h3>
      <p><strong>Myrat Daniyarov</strong><br>Digital Projects Creator</p>
      <p>Haarlem, Netherlands</p>
      <p>Email: <a id="lgEmail3" href="#">email</a><br>Phone: <a id="lgPhone" href="#">phone</a></p>
      <p>Responsible for content: Myrat Daniyarov.</p>
      <p>This website is a personal portfolio and does not offer goods or services for sale.</p>`,
    cookies:`<h3>Cookie settings</h3>
      <p>This website uses <strong>no</strong> advertising, analytics or third-party tracking cookies.</p>
      <p>Only essential local storage is used to remember your language preference and the content of the editing panel. This is required for the site to function as you configure it and stays on your device.</p>
      <p>Current status: <strong id="consentStatus"></strong></p>
      <div style="display:flex;gap:12px;margin-top:18px;flex-wrap:wrap">
        <button class="btn btn-primary" id="mAccept">Accept essential</button>
        <button class="btn btn-ghost" id="mDecline">Decline & clear</button>
      </div>`
  },
  nl:{
    privacy:`<h3>Privacybeleid</h3>
      <p>Deze portfoliowebsite respecteert je privacy en voldoet aan de Algemene Verordening Gegevensbescherming (AVG/GDPR) van de EU.</p>
      <h4>Verwerkingsverantwoordelijke</h4><p>Myrat Daniyarov, Haarlem, Nederland. Contact: <a id="lgEmail" href="#">e-mail</a>.</p>
      <h4>Welke gegevens we verwerken</h4>
      <ul>
        <li>Deze site verzamelt <strong>geen</strong> persoonsgegevens, gebruikt geen analytics en plaatst geen advertentie- of trackingcookies van derden.</li>
        <li>Lokale opslag in je browser wordt alleen gebruikt om je taalkeuze en de door jou bewerkte tekst in het beheerpaneel te onthouden. Deze gegevens verlaten je apparaat nooit en worden niet naar een server gestuurd.</li>
        <li>Als je per telefoon of e-mail contact opneemt, doe je dat vrijwillig; die gegevens worden uitsluitend gebruikt om je bericht te beantwoorden.</li>
      </ul>
      <h4>Externe bronnen</h4><p>Lettertypen worden geladen via Google Fonts. Bij het laden kan je browser je IP-adres naar Google sturen. Zie het privacybeleid van Google voor details. Er worden geen andere externe diensten gebruikt.</p>
      <h4>Je rechten</h4><p>Op grond van de AVG heb je recht op inzage, rectificatie, wissing, beperking en overdraagbaarheid van je gegevens, en het recht om bezwaar te maken. Je kunt alle lokaal opgeslagen gegevens op elk moment verwijderen via "Cookie-instellingen" → Weigeren, of door je browseropslag te wissen.</p>
      <h4>Contact</h4><p>Voor privacyverzoeken, mail <a id="lgEmail2" href="#">de verwerkingsverantwoordelijke</a>.</p>`,
    imprint:`<h3>Colofon</h3>
      <p><strong>Myrat Daniyarov</strong><br>Digital Projects Creator</p>
      <p>Haarlem, Nederland</p>
      <p>E-mail: <a id="lgEmail3" href="#">e-mail</a><br>Telefoon: <a id="lgPhone" href="#">telefoon</a></p>
      <p>Verantwoordelijk voor de inhoud: Myrat Daniyarov.</p>
      <p>Deze website is een persoonlijk portfolio en biedt geen goederen of diensten te koop aan.</p>`,
    cookies:`<h3>Cookie-instellingen</h3>
      <p>Deze website gebruikt <strong>geen</strong> advertentie-, analyse- of trackingcookies van derden.</p>
      <p>Alleen essentiële lokale opslag wordt gebruikt om je taalvoorkeur en de inhoud van het beheerpaneel te onthouden. Dit is nodig om de site te laten werken zoals je hem instelt en blijft op je apparaat.</p>
      <p>Huidige status: <strong id="consentStatus"></strong></p>
      <div style="display:flex;gap:12px;margin-top:18px;flex-wrap:wrap">
        <button class="btn btn-primary" id="mAccept">Essentieel accepteren</button>
        <button class="btn btn-ghost" id="mDecline">Weigeren & wissen</button>
      </div>`
  }
};
