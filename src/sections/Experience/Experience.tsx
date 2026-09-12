import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "../../components/UI/Modal/Modal";
import './Experience.scss'

const EXPERIENCE_KEYS = [
    'experience.items.0',
    'experience.items.1',
    'experience.items.2'
];

export function Experience() {
    const { t } = useTranslation();
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [visible, setVisible] = useState<boolean[]>(() => EXPERIENCE_KEYS.map(() => false));
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    const experiences = EXPERIENCE_KEYS.map(key => ({
        date: t(`${key}.date`),
        position: t(`${key}.position`),
        project: t(`${key}.project`),
        summary: t(`${key}.summary`),
        description: t(`${key}.description`)
    }));

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    const index = Number(entry.target.getAttribute('data-index'));
                    setVisible((prev) => {
                        if (prev[index]) return prev;
                        const next = [...prev];
                        next[index] = true;
                        return next;
                    });
                    observer.unobserve(entry.target);
                });
            },
            { threshold: 0.3 }
        );

        cardRefs.current.forEach((card) => card && observer.observe(card));

        return () => observer.disconnect();
    }, []);

    const active = openIndex !== null ? experiences[openIndex] : null;

    return (
        <section className="experience" id="experience">
            <h1 className="experience__h1">{t('experience.title')}</h1>

            <div className="experience__timeline">
                {experiences.map((exp, index) => (
                    <div
                        key={index}
                        ref={(el) => { cardRefs.current[index] = el; }}
                        data-index={index}
                        className={`experience__row ${visible[index] ? 'experience__row--visible' : ''}`}
                    >
                        <div className="experience__dot" />
                        <button
                            type="button"
                            className="experience__card"
                            onClick={() => setOpenIndex(index)}
                        >
                            <div className="experience__card-date">{exp.date}</div>
                            <div className="experience__card-position">{exp.position}</div>
                            <div className="experience__card-project">{exp.project}</div>
                            <div className="experience__card-summary">{exp.summary}</div>
                        </button>
                    </div>
                ))}
            </div>

            <Modal isOpen={openIndex !== null} onClose={() => setOpenIndex(null)}>
                {active && (
                    <div className="experience__modal">
                        <div className="experience__modal-date">{active.date}</div>
                        <h2 className="experience__modal-title">{active.project}</h2>
                        <div className="experience__modal-position">{active.position}</div>
                        {active.description.split('\n\n').map((paragraph, pIndex) => (
                            <p key={pIndex} className="experience__modal-text">{paragraph}</p>
                        ))}
                    </div>
                )}
            </Modal>
        </section>
    )
}
