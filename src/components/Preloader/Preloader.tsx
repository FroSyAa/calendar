import './Preloader.scss';

type PreloaderProps = {
    compact?: boolean;
    label?: string;
};

export function Preloader({ compact = false, label = 'Загрузка страницы' }: PreloaderProps) {
    return (
        <div
            className={compact ? 'preloader preloader--compact' : 'preloader'}
            role="status"
            aria-live="polite"
            aria-label={label}
        >
            <div className="preloader__grid">
                <span className="preloader__square preloader__square--1" />
                <span className="preloader__square preloader__square--2" />
                <span className="preloader__square preloader__square--3" />
                <span className="preloader__square preloader__square--4" />
            </div>
            <span className="visually-hidden">Загрузка...</span>
        </div>
    );
}
