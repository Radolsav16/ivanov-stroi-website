export default function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950">
      <div
        role="status"
        aria-label="Зареждане"
        className="size-8 animate-spin rounded-full border-2 border-white/20 border-t-amber-500"
      />
    </div>
  );
}
