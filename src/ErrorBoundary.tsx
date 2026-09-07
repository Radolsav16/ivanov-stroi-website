import { Component, type ReactNode } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    if (import.meta.env.DEV) {
      console.error("Application rendering error", { name: error.name });
    }
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-950 px-6 text-center text-white">
        <div className="max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl shadow-black/30 sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
            Възникна проблем
          </p>
          <h1 className="mt-4 text-3xl font-black tracking-tight">
            Нека опитаме отново
          </h1>
          <p className="mt-4 leading-7 text-gray-300">
            Част от страницата не се зареди както трябва. Можете да опитате отново или да се върнете към началната страница.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => this.setState({ hasError: false })}
              className="rounded-xl bg-amber-500 px-5 py-3 text-sm font-bold text-gray-950 transition hover:bg-amber-400"
            >
              Опитайте отново
            </button>
            <a
              href="/"
              className="rounded-xl border border-white/15 px-5 py-3 text-sm font-bold text-white transition hover:border-amber-500/50 hover:text-amber-400"
            >
              Към началото
            </a>
          </div>
        </div>
      </main>
    );
  }
}
