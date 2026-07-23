import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border mt-12 py-6 px-4">
      <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
        <Link to="/about" className="hover:text-foreground transition-colors">
          من نحن
        </Link>
        <span>•</span>
        <Link to="/contact" className="hover:text-foreground transition-colors">
          اتصل بنا
        </Link>
        <span>•</span>
        <Link to="/faq" className="hover:text-foreground transition-colors">
          الأسئلة الشائعة
        </Link>
        <span>•</span>
        <Link to="/blog" className="hover:text-foreground transition-colors">
          المدونة
        </Link>
        <span>•</span>
        <Link to="/terms" className="hover:text-foreground transition-colors">
          الشروط والأحكام
        </Link>
        <span>•</span>
        <Link to="/privacy" className="hover:text-foreground transition-colors">
          سياسة الخصوصية
        </Link>
        <span>•</span>
        <Link to="/refund" className="hover:text-foreground transition-colors">
          سياسة الاسترداد
        </Link>
      </div>
    </footer>
  );
}
