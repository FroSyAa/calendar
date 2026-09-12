import { useTranslation } from "react-i18next";
import './Skills.scss';

interface HardSkill {
    category: string;
    items: string;
}

interface SoftSkill {
    title: string;
    text: string;
}

export function Skills () {
    const { t } = useTranslation();

    const hardSkills = t('skills.hard', { returnObjects: true }) as HardSkill[];
    const softSkills = t('skills.soft', { returnObjects: true }) as SoftSkill[];

    return (
        <section className="skills" id="skills">
            <div className="skills__column">
                <h1 className="skills__h1">{t('skills.titleHard')}</h1>
                <div className="skills__list">
                    {hardSkills.map((skill, index) => (
                        <div key={index} className="skills__card skills__card--hard">
                            <div className="skills__card-category">{skill.category}</div>
                            <div className="skills__card-items">{skill.items}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="skills__column">
                <h1 className="skills__h1">{t('skills.titleSoft')}</h1>
                <div className="skills__list">
                    {softSkills.map((skill, index) => (
                        <div key={index} className="skills__card skills__card--soft">
                            <div className="skills__card-title">{skill.title}</div>
                            <div className="skills__card-text">{skill.text}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
