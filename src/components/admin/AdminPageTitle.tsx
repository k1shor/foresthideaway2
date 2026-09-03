interface AdminPageTitleProps {
  children: React.ReactNode;
  className?: string;
}

export default function AdminPageTitle({ children, className = "" }: AdminPageTitleProps) {
  return (
    <h1 className={`font-serif text-2xl font-semibold uppercase tracking-[0.1em] text-[#c8923a] ${className}`}>
      {children}
    </h1>
  );
}
