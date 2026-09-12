import { useEffect, useState } from 'react';
import './Header.scss';
import { Navigation } from "../Navigation"
import { StyleSwitch } from '../UI/StyleSwitch';
import { useTranslation } from 'react-i18next';
import { LanguageSwitch } from '../UI/LanguageSwitch/LanguageSwitch';

export function Header() {
    const { t } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (!isMenuOpen) {
            return;
        }

        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    return (
        <header className="header">
            <a className="header__brand" href="/#" >
                {t('header.brand')}
            </a>
            <div className="header__nav">
                <Navigation />
            </div>
            <div className="header__actions">
                <StyleSwitch />
                <LanguageSwitch />
                <button
                    type="button"
                    className="header__burger"
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-navigation"
                    aria-label={isMenuOpen ? t('header.closeMenu') : t('header.openMenu')}
                    title={isMenuOpen ? t('header.closeMenu') : t('header.openMenu')}
                    onClick={() => setIsMenuOpen(prev => !prev)}
                >
                    <span className="header__burger-line" />
                    <span className="header__burger-line" />
                    <span className="header__burger-line" />
                </button>
            </div>
            {isMenuOpen && (
                <div className="header__mobile-nav" id="mobile-navigation">
                    <Navigation onNavigate={() => setIsMenuOpen(false)} />
                </div>
            )}
        </header>
    )
}