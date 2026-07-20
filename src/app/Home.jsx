import { useEffect, useState } from 'react';
import './Home.scss';
import eye from '../assets/images/Untitled_Artwork 2.gif';

const branches = [
    {
        href: 'https://instagram.com/supa_haxor',
        external: true,
        es: {
            title: 'Por medio del arte',
            context: 'Dibujos simbólicos que apuntan a la misma idea. Incluso los cómics bobos tienen su lado oscuro. Algunos vlogs irl.',
            label: 'Instagram'
        },
        en: {
            title: 'Through art',
            context: 'Symbolic drawings that point to the same idea. Even the dumb comics have their dark side. Some irl vlogs.',
            label: 'Instagram'
        }
    },
    {
        href: 'https://youtube.com/@supahaxor',
        external: true,
        es: {
            title: 'Pensándolo mejor',
            context: 'Videos de formato más largo intentando encontrar la verdad en todo esto. Un proyecto que empezó en 2021.',
            label: 'YouTube'
        },
        en: {
            title: 'On second thought',
            context: 'Longer-form videos trying to find the truth in all of this. A project that started in 2021.',
            label: 'YouTube'
        }
    },
    {
        href: 'https://blog.supa-haxor.com',
        external: true,
        es: {
            title: 'Más adentro',
            context: <>La mejor manera de conectar todos los formatos. Explicaciones explícitas de cómo veo el mundo y hacia dónde quisiera empujarlo un poco. <a href="https://blog.supa-haxor.com" target="_blank" rel="noopener noreferrer">¿Qué es el Logos?(?)</a></>,
            label: 'Blog'
        },
        en: {
            title: 'Further in',
            context: <>The best way to connect all the formats. Explicit explanations of how I see the world and where I'd like to nudge it a bit. <a href="https://blog.supa-haxor.com" target="_blank" rel="noopener noreferrer">What is the Logos?(?)</a></>,
            label: 'Blog'
        }
    }
];

const description = {
    es: [
        <>Ser uno mismo viene también de aceptar las cosas como son. Nacimos con <strong>variables muy específicas</strong> en un mundo que nos invita a dejarlas atrás para poder pertenecer.</>,
        <>Nuestra historia, nuestros dolores y nuestras derrotas dicen tanto de nosotros como lo que mostramos con orgullo. Incluso aquello que nosotros mismos causamos. <strong>Aceptarnos no significa justificarnos; también significa mirar de frente lo que hicimos y decidir qué hacemos con eso.</strong></>,
        'Sí, bro, ya sé: eres el vergas. Pero ¿y tus dolores? ¿Llegaste hasta ahí con integridad? ¿Cuántas veces pasamos por encima de alguien para poder triunfar?',
        <>Porque <strong>ser uno mismo también viene con principios.</strong> Con ética. Con hacer lo correcto incluso cuando se siente como una oportunidad desperdiciada. Rechazar a la mujer casada nunca fue tan difícil.</>,
        'The Supa-Haxor Project invita a la autenticidad desde la crudeza. Una pequeña protesta contra el contenido hiperoptimizado, las máscaras y las tendencias que nos enseñan constantemente que hay que ocultar nuestros fallos, nuestras cicatrices y lo no tan estético.',
        <>Ser uno mismo no es salir a gritar qué tan diferentes somos. Tampoco es usar “así soy” como excusa. Quizá es algo mucho menos espectacular: dejar de forzarnos para encajar, <strong>aceptar nuestra historia —también las partes que preferiríamos haber hecho diferente—</strong> y estar suficientemente presentes para reconocer lo que somos y actuar con integridad desde ahí.</>,
        'Así duela.'
    ],
    en: [
        <>Being yourself also comes from accepting things as they are. We were born with <strong>very specific variables</strong> in a world that invites us to leave them behind in order to belong.</>,
        <>Our history, our pain and our defeats say as much about us as what we show with pride. Even that which we caused ourselves. <strong>Accepting ourselves does not mean justifying ourselves; it also means looking straight at what we did and deciding what we do with it.</strong></>,
        'Yeah bro, I know — you\'re the shit. But what about your pain? Did you get there with integrity? How many times do we step over someone just to make it?',
        <>Because <strong>being yourself also comes with principles.</strong> With ethics. With doing the right thing even when it feels like a wasted opportunity. Turning down the married woman was never this hard.</>,
        'The Supa-Haxor Project invites authenticity through rawness. A small protest against hyper-optimized content, the masks, and the trends that constantly teach us to hide our failures, our scars, and whatever isn\'t aesthetic enough.',
        <>Being yourself is not going out to shout how different we are. Nor is it using “that's just how I am” as an excuse. Maybe it's something much less spectacular: stopping the effort to force ourselves to fit in, <strong>accepting our history — including the parts we wish we had done differently —</strong> and being present enough to recognize what we are and act with integrity from there.</>,
        'Even if it hurts.'
    ]
};

const Branch = ({ title, context, label, href, external }) => (
    <section className="branch">
        <h2>{title}</h2>
        <p>{context}</p>
        <a
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
        >
            → {label}
        </a>
    </section>
);

const slogans = {
    es: 'siendo usted mismo, así duela',
    en: 'being yourself, even if it hurts'
};

const browserLang = () =>
    (navigator.language || '').toLowerCase().startsWith('es') ? 'es' : 'en';

const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

const scrollTo = (selector) => {
    const target = document.querySelector(selector);
    if (!target) return;

    const start = window.scrollY;
    const end = target.getBoundingClientRect().top + start;
    const distance = end - start;
    if (Math.abs(distance) < 1) return;

    const viewport = window.innerHeight || 800;
    const short = Math.abs(distance) < viewport * 0.55;
    const duration = short ? 3000 : 1100;
    const ease = short ? easeOutCubic : easeOutQuint;

    let startTime = null;

    const step = (now) => {
        if (!startTime) startTime = now;
        const progress = Math.min((now - startTime) / duration, 1);
        window.scrollTo(0, start + distance * ease(progress));
        if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
};

const Home = () => {
    const [lang, setLang] = useState(browserLang);

    useEffect(() => {
        document.title = 'supa haxor';
    }, []);

    // faceless glyphs extend past their layout box; browsers sometimes keep
    // the old spikes painted until a full repaint (e.g. switching windows)
    useEffect(() => {
        const targets = document.querySelectorAll('.home-hero h1, .branch h2, .home-branches-grid');
        targets.forEach((el) => {
            el.style.opacity = '0.99';
            // force layout
            void el.offsetHeight;
            el.style.opacity = '';
        });
    }, [lang]);

    const paragraphs = description[lang];

    return (
        <main className="home">
            <nav className="lang-toggle">
                <button className={lang === 'es' ? 'selected' : ''} onClick={() => setLang('es')}>es</button>
                <span>|</span>
                <button className={lang === 'en' ? 'selected' : ''} onClick={() => setLang('en')}>en</button>
            </nav>

            <header className="home-hero">
                <img src={eye} alt="" width="170" height="170" />
                <h1>supa haxor</h1>
                <p key={lang}>{slogans[lang]}</p>
                <button className="scroll-hint" onClick={() => scrollTo('.home-description')} aria-label="scroll down">
                    ↓
                </button>
            </header>

            <section className="home-description">
                <div className="home-description-body" key={lang}>
                    {paragraphs.map((text, i) => {
                        const isClosing = i === paragraphs.length - 1;
                        return (
                            <p key={i} className={isClosing ? 'closing' : undefined}>
                                {isClosing
                                    ? <><span className="tilde">~</span> {text} <span className="tilde">~</span></>
                                    : text}
                            </p>
                        );
                    })}
                </div>
                <button className="scroll-hint" onClick={() => scrollTo('.home-branches')} aria-label="scroll down">
                    ↓
                </button>
            </section>

            <section className="home-branches">
                <div className="home-branches-grid" key={lang}>
                    {branches.map(branch => (
                        <Branch
                            key={branch.href}
                            href={branch.href}
                            external={branch.external}
                            {...branch[lang]}
                        />
                    ))}
                </div>
                <button className="scroll-hint" onClick={() => scrollTo('.home-footer')} aria-label="scroll down">
                    ↓
                </button>
            </section>

            <footer className="home-footer">
                <div className="home-footer-links">
                    <a target="_blank" rel="noopener noreferrer" href="https://x.com/supa_haxor">X</a>
                    <a href="#newsletter">newsletter</a>
                </div>
                <p className="home-credit">
                    made with love by Cursor and the{' '}
                    <a target="_blank" rel="noopener noreferrer" href="https://github.com/supa-haxor">@supa-haxor</a>
                </p>
            </footer>
        </main>
    );
};

export default Home;
