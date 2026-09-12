import { useTranslation } from 'react-i18next';
import './Contacts.scss';

function IconEmail() {
    return (
        <svg className="contacts__icon-link__icon" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M0 1694.235h1920V226H0v1468.235ZM112.941 376.664V338.94H1807.06v37.723L960 1111.233l-847.059-734.57ZM1807.06 526.198v950.513l-351.134-438.89-88.32 70.475 378.353 472.998H174.042l378.353-472.998-88.32-70.475-351.134 438.89V526.198L960 1260.768l847.059-734.57Z" />
        </svg>
    );
}

function IconGithub() {
    return (
        <svg className="contacts__icon-link__icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 .5C5.73.5.98 5.24.98 11.52c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55 0-.27-.01-1.15-.02-2.09-3.16.69-3.83-1.35-3.83-1.35-.52-1.3-1.26-1.65-1.26-1.65-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.29.94.1-.73.4-1.23.72-1.51-2.52-.29-5.17-1.26-5.17-5.6 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.15 1.16a10.9 10.9 0 0 1 5.73 0c2.19-1.47 3.15-1.16 3.15-1.16.62 1.57.23 2.73.11 3.02.73.79 1.17 1.8 1.17 3.04 0 4.35-2.65 5.31-5.18 5.59.41.35.77 1.04.77 2.11 0 1.52-.01 2.75-.01 3.13 0 .3.2.66.79.55A11.04 11.04 0 0 0 23.02 11.5C23.02 5.24 18.27.5 12 .5z" />
        </svg>
    );
}

function IconTelegram() {
    return (
        <svg className="contacts__icon-link__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M23.1117 4.49449C23.4296 2.94472 21.9074 1.65683 20.4317 2.227L2.3425 9.21601C0.694517 9.85273 0.621087 12.1572 2.22518 12.8975L6.1645 14.7157L8.03849 21.2746C8.13583 21.6153 8.40618 21.8791 8.74917 21.968C9.09216 22.0568 9.45658 21.9576 9.70712 21.707L12.5938 18.8203L16.6375 21.8531C17.8113 22.7334 19.5019 22.0922 19.7967 20.6549L23.1117 4.49449ZM3.0633 11.0816L21.1525 4.0926L17.8375 20.2531L13.1 16.6999C12.7019 16.4013 12.1448 16.4409 11.7929 16.7928L10.5565 18.0292L10.928 15.9861L18.2071 8.70703C18.5614 8.35278 18.5988 7.79106 18.2947 7.39293C17.9906 6.99479 17.4389 6.88312 17.0039 7.13168L6.95124 12.876L3.0633 11.0816ZM8.17695 14.4791L8.78333 16.6015L9.01614 15.321C9.05253 15.1209 9.14908 14.9366 9.29291 14.7928L11.5128 12.573L8.17695 14.4791Z" />
        </svg>
    );
}

const socials = [
    { key: 'email', href: 'mailto:nshipunoff@yandex.ru', label: 'contacts.emailLabel', Icon: IconEmail },
    { key: 'github', href: 'https://github.com/FroSyAa', label: 'contacts.githubLabel', Icon: IconGithub },
    { key: 'telegram', href: 'https://t.me/VacBlankuus', label: 'contacts.telegramLabel', Icon: IconTelegram },
];

export function Contacts() {
    const { t } = useTranslation();

    return (
        <section className="contacts" id="contacts">
            <div className="contacts__content">
                <h1 className="contacts__h1">{t('contacts.contactTitle')}</h1>
                <h2 className="contacts__h2">{t('contacts.contactFirstText')}</h2>
                <h2 className="contacts__h2">{t('contacts.contactSecondText')}</h2>

                <div className="contacts__socials">
                    {socials.map(({ key, href, label, Icon }) => (
                        <a
                            key={key}
                            className="contacts__icon-link"
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={t(label)}
                        >
                            <Icon />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}