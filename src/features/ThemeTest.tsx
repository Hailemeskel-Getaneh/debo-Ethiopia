import React from 'react';

const ThemeTest: React.FC = () => {
    return (
        <div className="p-10 space-y-12 bg-white min-h-screen">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold text-brand-main"> Theme Testing</h1>
                <p className="text-zinc-500">A showcase of all custom project colors and their variants.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Primary Section */}
                <section className="space-y-6 p-6 rounded-2xl border border-primary-100 bg-primary-50/20">
                    <h2 className="text-2xl font-bold text-brand-main flex items-center gap-2">
                        Primary Colors
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <div className="h-16 rounded-lg bg-brand-main shadow-sm flex items-end p-2">
                                <span className="text-xs text-white font-bold">brand-main</span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="h-16 rounded-lg bg-primary-500 shadow-sm flex items-end p-2">
                                <span className="text-xs text-white font-bold">primary-500</span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="h-16 rounded-lg bg-primary-300 shadow-sm flex items-end p-2">
                                <span className="text-xs text-white font-bold">primary-300</span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="h-16 rounded-lg bg-primary-50 border border-primary-100 shadow-sm flex items-end p-2">
                                <span className="text-xs text-primary-900 font-bold">primary-50</span>
                            </div>
                        </div>
                    </div>
                    <button className="w-full py-3 bg-brand-main text-white font-bold rounded-xl hover:bg-primary-500 transition-colors shadow-lg shadow-primary-500/20">
                        Primary Action
                    </button>
                </section>

                {/* Secondary Section */}
                <section className="space-y-6 p-6 rounded-2xl border border-secondary-100 bg-secondary-50/10">
                    <h2 className="text-2xl font-bold text-brand-secondary flex items-center gap-2">
                        Secondary Colors
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <div className="h-16 rounded-lg bg-brand-secondary shadow-sm flex items-end p-2">
                                <span className="text-xs text-white font-bold">brand-secondary</span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="h-16 rounded-lg bg-secondary-500 shadow-sm flex items-end p-2">
                                <span className="text-xs text-white font-bold">secondary-500</span>
                            </div>
                        </div>
                    </div>
                    <button className="w-full py-3 bg-brand-secondary text-white font-bold rounded-xl hover:opacity-90 transition-colors shadow-lg shadow-secondary-500/20">
                        Secondary Info
                    </button>
                </section>

                {/* Action/Accent Section */}
                <section className="space-y-6 p-6 rounded-2xl border border-brand-action/20 bg-brand-action/5">
                    <h2 className="text-2xl font-bold text-brand-action flex items-center gap-2">
                        Accent Colors
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <div className="h-16 rounded-lg bg-brand-action shadow-lg flex items-end p-2">
                                <span className="text-xs text-white font-bold">brand-action</span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="h-16 rounded-lg bg-brand-action/50 shadow-sm flex items-end p-2">
                                <span className="text-xs text-white font-bold">action-50%</span>
                            </div>
                        </div>
                    </div>
                    <button className="w-full py-4 bg-brand-action text-white font-black text-lg rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-brand-action/30 flex items-center justify-center gap-2">
                        Donate Now ❤️
                    </button>
                </section>
            </div>

            {/* Typography and Combinations */}
            <div className="p-8 rounded-3xl bg-zinc-900 text-white space-y-6">
                <h2 className="text-2xl font-bold">Usage Patterns</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-zinc-400">
                    <div className="space-y-4">
                        <p className="text-white font-medium">Headings & Links</p>
                        <p>Use <span className="text-brand-main font-bold">primary-600</span> for main headings and <span className="text-brand-secondary font-medium underline decoration-secondary-500/50">secondary-500</span> for interactive link underlines or info text.</p>
                        <div className="bg-zinc-800 p-3 rounded-lg text-xs font-mono text-zinc-300">
                            {`<h1 className="text-brand-main">...</h1>`}
                        </div>
                    </div>
                    <div className="space-y-4">
                        <p className="text-white font-medium">Semantic Borders</p>
                        <div className="border-l-4 border-brand-action p-4 bg-zinc-800 rounded-lg">
                            <p className="text-zinc-300 italic">Important notices are marked with the <span className="text-brand-action font-bold">brand-action</span> coral border.</p>
                        </div>
                        <div className="bg-zinc-800 p-3 rounded-lg text-xs font-mono text-zinc-300">
                            {`<div className="border-brand-action">...</div>`}
                        </div>
                    </div>
                    <div className="space-y-4">
                        <p className="text-white font-medium">Backgrounds</p>
                        <div className="p-3 bg-primary-50 text-primary-900 rounded border border-primary-200 text-sm">
                            Subtle background usage
                        </div>
                        <div className="bg-zinc-800 p-3 rounded-lg text-xs font-mono text-zinc-300">
                            {`<div className="bg-primary-50 text-primary-900">...</div>`}
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-8 border-t border-zinc-800">
                <div className="bg-zinc-800/50 p-6 rounded-2xl border border-zinc-700 space-y-4">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        Theme Configuration Source
                    </h2>
                    <p className="text-white text-sm">
                        All colors are defined in <code className="text-brand-secondary bg-zinc-900 px-2 py-0.5 rounded">src/styles/globals.css</code> using the Tailwind v4 <code className="text-brand-main">@theme</code> directive.
                    </p>
                    <div className="bg-zinc-950 p-4 rounded-xl text-xs font-mono text-zinc-400 border border-zinc-800 overflow-x-auto">
                        <pre>
                            {`@theme {
  --color-primary-600: oklch(0.48 0.14 165); /* brand-main */
  --color-secondary-500: oklch(0.65 0.15 45); /* brand-secondary */
  --color-accent-500: oklch(0.6 0.18 20);    /* brand-action */
  
  --color-brand-main: var(--color-primary-600);
  --color-brand-secondary: var(--color-secondary-500);
  --color-brand-action: var(--color-accent-500);
}`}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThemeTest;
