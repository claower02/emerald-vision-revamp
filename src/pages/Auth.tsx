import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Zap, ArrowLeft } from "lucide-react";

const schema = z.object({
  email: z.string().trim().email("Неверный email").max(255),
  password: z.string().min(6, "Минимум 6 символов").max(72),
});

export default function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/admin");
    });
  }, [navigate]);

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Аккаунт создан! Войдите.");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword(values);
        if (error) throw error;
        toast.success("Добро пожаловать");
        navigate("/admin");
      }
    } catch (e) {
      toast.error("Ошибка", { description: (e as Error).message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center px-4 py-16">
      <Link to="/" className="absolute top-6 left-6 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono text-xs uppercase tracking-wider">
        <ArrowLeft className="h-4 w-4" /> На сайт
      </Link>

      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="h-10 w-10 grid place-items-center border border-primary/60 animate-pulse-neon">
            <Zap className="h-5 w-5 text-primary" />
          </div>
          <div className="font-mono">
            <div className="text-primary tracking-[0.3em] text-sm">DEMETRA</div>
            <div className="text-xs text-muted-foreground tracking-widest">// ADMIN ACCESS</div>
          </div>
        </div>

        <div className="corner-frame p-8 bg-card/60 backdrop-blur">
          <h1 className="text-2xl font-bold mb-2">{mode === "signin" ? "Вход" : "Регистрация"}</h1>
          <p className="text-sm text-muted-foreground mb-6 font-mono">
            {mode === "signin" ? "// Авторизация в системе" : "// Создание учётной записи"}
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2 block">Email</label>
              <Input {...register("email")} type="email" autoComplete="email" className="bg-background border-border focus:border-primary h-12" />
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2 block">Пароль</label>
              <Input {...register("password")} type="password" autoComplete={mode === "signin" ? "current-password" : "new-password"} className="bg-background border-border focus:border-primary h-12" />
              {errors.password && <p className="text-xs text-destructive mt-1">{errors.password.message}</p>}
            </div>

            <Button type="submit" variant="toxic" size="lg" className="w-full" disabled={loading}>
              {loading ? "..." : mode === "signin" ? "Войти" : "Создать аккаунт"}
            </Button>
          </form>

          <button
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="mt-6 w-full text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
          >
            {mode === "signin" ? "// Нет аккаунта? Зарегистрироваться" : "// Уже есть аккаунт? Войти"}
          </button>
        </div>

        <p className="mt-6 text-xs text-muted-foreground font-mono text-center">
          Доступ к админ-панели только для администраторов.
        </p>
      </div>
    </div>
  );
}
