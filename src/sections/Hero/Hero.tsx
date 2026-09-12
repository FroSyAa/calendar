import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useTranslation } from 'react-i18next';
import { useTypewriterCycle } from '../../hooks/useTypewriterCycle';
import Scene from '../../components/3D/Scene';
import { Preloader } from '../../components/Preloader';
import './Hero.scss';

const WORD_KEYS = [
    'hero.firstMessage',
    'hero.secondMessage',
    'hero.thirdMessage'
];

export function Hero() {
    const { t, i18n } = useTranslation();
    
    const translatedWords = WORD_KEYS.map(key => t(key));
    const text = useTypewriterCycle(translatedWords, 75, 35, 500, i18n.language);

    return (
        <section className="hero">
            <div className="hero__content">
                <h1 className="hero__h1">{t('hero.hello')}<br />
                {t('hero.me')} <span className="hero__h1__name">{t("hero.name")}</span>
                </h1>
                <h2 className="hero__h2">
                    {text}
                    <span className="cursor">|</span>
                </h2>
            </div>
            <div className="hero__visual" aria-hidden="true">
                <Canvas camera={{ position: [0, 0, 8], fov: 35 }} dpr={[1, 2]} shadows>
                    <Suspense fallback={
                        <Html center>
                            <Preloader compact label="Загрузка 3D-модели" />
                        </Html>
                    }>
                        <Scene />
                    </Suspense>
                </Canvas>
            </div>
        </section>
    );
}