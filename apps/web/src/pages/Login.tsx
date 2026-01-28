import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@repo/schemas";
import { useAuth } from "../hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, Mail, Lock, AlertCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { motion } from "framer-motion";

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      setError(null);
      await login(data.email, data.password);
      navigate("/");
    } catch (err: unknown) {
      if (isAxiosError(err) && err.response?.status === 401) {
        setError("Email ou senha inválidos. Verifique suas credenciais.");
      } else {
        setError("Ocorreu um erro ao conectar. Tente novamente mais tarde.");
      }
    }
  };

  return (
    <div className="flex min-h-screen w-full font-sans">
      {/* Left Side - Visual / Branding */}
      <div className="hidden lg:flex w-1/2 bg-zinc-950 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/50 via-zinc-950 to-zinc-950 z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop')] bg-cover bg-center opacity-10 blur-[1px]" />

        {/* Abstract decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] animate-pulse delay-1000" />

        <div className="relative z-20 flex flex-col items-center text-center p-12 space-y-8 max-w-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
            className="h-24 w-24 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-900/20 mb-6 border border-white/10 ring-4 ring-white/5"
          >
            <span className="text-4xl font-bold text-white">AM</span>
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl font-extrabold text-white tracking-tight leading-tight"
            >
              A Mentoria <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Dashboard
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-zinc-400 leading-relaxed"
            >
              Gerencie alunos, matrículas e acompanhe o desempenho da sua
              plataforma com elegância e precisão.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background relative overflow-hidden">
        {/* Subtle background decoration for right side */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-500/5 rounded-full blur-[64px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[400px] space-y-10 z-10"
        >
          <div className="flex flex-col space-y-2 text-center lg:text-left">
            {/* Mobile-only H1 for accessibility */}
            <h1 className="sr-only lg:hidden">A Mentoria Dashboard</h1>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Bem-vindo de volta
            </h2>
            <p className="text-sm text-muted-foreground">
              Acesse sua conta para continuar gerenciando
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/80">
                        Email Corporativo
                      </FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                          <Input
                            placeholder="seu@email.com"
                            type="email"
                            className="pl-10 h-12 bg-muted/30 border-input transition-all focus:bg-background focus:ring-2 focus:ring-primary/20"
                            autoComplete="email"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/80">
                        Senha
                      </FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                          <Input
                            placeholder="••••••••"
                            type="password"
                            className="pl-10 h-12 bg-muted/30 border-input transition-all focus:bg-background focus:ring-2 focus:ring-primary/20"
                            autoComplete="current-password"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                          animate={{
                            opacity: 1,
                            height: "auto",
                            marginBottom: 16,
                          }}
                          className="flex items-center gap-3 p-4 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-200 dark:border-red-900/20"
                        >
                          <AlertCircle className="h-5 w-5 flex-shrink-0" />
                          <span>{error}</span>
                        </motion.div>
                      )}
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 font-semibold text-base shadow-xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all hover:scale-[1.01]"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Autenticando...
                  </>
                ) : (
                  <>
                    Acessar Plataforma
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>
          </Form>

          <div className="pt-8 relative">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
