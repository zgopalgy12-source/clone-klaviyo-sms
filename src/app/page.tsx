"use client"

import { useState } from "react"
import { Send, Users, MessageSquare, TrendingUp, Plus, Search, Filter, MoreVertical, CheckCircle2, Zap, Mail, ShoppingCart, Gift, Lock, Link2, Code, FileText, MousePointerClick, DollarSign, BarChart3, Settings, Eye, EyeOff, Copy, Download, Upload, CreditCard, Smartphone, ExternalLink, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

type Campaign = {
  id: string
  name: string
  message: string
  status: "sent" | "scheduled" | "draft"
  recipients: number
  sent: number
  delivered: number
  clicked: number
  revenue: number
  date: string
}

type Contact = {
  id: string
  name: string
  phone: string
  email?: string
  tags: string[]
  status: "active" | "unsubscribed" | "pending"
  consentDate?: string
  source: string
}

type Automation = {
  id: string
  name: string
  type: "welcome" | "cart" | "vip" | "early-access" | "post-purchase"
  trigger: string
  status: "active" | "paused"
  sent: number
  revenue: number
}

type Segment = {
  id: string
  name: string
  criteria: string
  contacts: number
  color: string
}

type DiscountCode = {
  id: string
  code: string
  discount: string
  type: "percentage" | "fixed"
  usageLimit: number
  used: number
  expiresAt: string
}

type LandingTemplate = {
  id: string
  name: string
  description: string
  preview: string
  category: string
}

// Helper function to format numbers consistently
const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

export default function ActiveTextPlatform() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isNewCampaignOpen, setIsNewCampaignOpen] = useState(false)
  const [isNewContactOpen, setIsNewContactOpen] = useState(false)
  const [isNewAutomationOpen, setIsNewAutomationOpen] = useState(false)
  const [isNewSegmentOpen, setIsNewSegmentOpen] = useState(false)
  const [isNewDiscountOpen, setIsNewDiscountOpen] = useState(false)
  const [isCollectorOpen, setIsCollectorOpen] = useState(false)
  const [isVIPAccessOpen, setIsVIPAccessOpen] = useState(false)
  const [isSignupOpen, setIsSignupOpen] = useState(false)
  const [isLandingBuilderOpen, setIsLandingBuilderOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [showLiquidCode, setShowLiquidCode] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)

  // Mock data
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: "1",
      name: "Promoção Black Friday",
      message: "🔥 BLACK FRIDAY! 50% OFF em tudo. Use: BF50. Válido até meia-noite! Link: activetext.co/bf50",
      status: "sent",
      recipients: 5420,
      sent: 5420,
      delivered: 5398,
      clicked: 1247,
      revenue: 45230,
      date: "2024-01-15"
    },
    {
      id: "2",
      name: "Carrinho Abandonado - VIP",
      message: "Ei! Você esqueceu algo no carrinho 🛒 Complete sua compra com 15% OFF exclusivo: VIPBACK15",
      status: "sent",
      recipients: 892,
      sent: 892,
      delivered: 887,
      clicked: 234,
      revenue: 12450,
      date: "2024-01-14"
    },
    {
      id: "3",
      name: "Acesso Antecipado - Nova Coleção",
      message: "✨ VIP! Acesso exclusivo à nova coleção 24h antes. Senha: VIPFIRST. Link: activetext.co/early",
      status: "scheduled",
      recipients: 1250,
      sent: 0,
      delivered: 0,
      clicked: 0,
      revenue: 0,
      date: "2024-01-20"
    }
  ])

  const [contacts, setContacts] = useState<Contact[]>([
    { id: "1", name: "João Silva", phone: "+351 91 234 5678", email: "joao@email.com", tags: ["VIP", "Black Friday"], status: "active", consentDate: "2024-01-10", source: "Pop-up" },
    { id: "2", name: "Maria Santos", phone: "+351 92 345 6789", email: "maria@email.com", tags: ["Newsletter"], status: "active", consentDate: "2024-01-12", source: "Landing Page" },
    { id: "3", name: "Pedro Costa", phone: "+351 93 456 7890", tags: ["VIP", "Early Access"], status: "active", consentDate: "2024-01-08", source: "Keyword Opt-in" },
    { id: "4", name: "Ana Oliveira", phone: "+351 94 567 8901", tags: ["Black Friday"], status: "unsubscribed", consentDate: "2024-01-05", source: "Formulário" },
    { id: "5", name: "Carlos Mendes", phone: "+351 95 678 9012", tags: ["VIP"], status: "pending", source: "Pop-up" }
  ])

  const [automations, setAutomations] = useState<Automation[]>([
    { id: "1", name: "Boas-vindas + Desconto", type: "welcome", trigger: "Novo cadastro", status: "active", sent: 1247, revenue: 8920 },
    { id: "2", name: "Carrinho Abandonado 24h", type: "cart", trigger: "24h sem compra", status: "active", sent: 892, revenue: 12450 },
    { id: "3", name: "Upgrade para VIP", type: "vip", trigger: "3ª compra realizada", status: "active", sent: 156, revenue: 5600 },
    { id: "4", name: "Acesso Antecipado", type: "early-access", trigger: "Novo produto lançado", status: "paused", sent: 0, revenue: 0 },
    { id: "5", name: "Pós-compra + Upsell", type: "post-purchase", trigger: "Compra confirmada", status: "active", sent: 2341, revenue: 18750 }
  ])

  const [segments, setSegments] = useState<Segment[]>([
    { id: "1", name: "VIP", criteria: "Compras > €500", contacts: 1250, color: "blue" },
    { id: "2", name: "Carrinho Abandonado", criteria: "Últimas 48h", contacts: 342, color: "blue" },
    { id: "3", name: "Novos Assinantes", criteria: "Últimos 7 dias", contacts: 567, color: "blue" },
    { id: "4", name: "Inativos", criteria: "Sem compra 30+ dias", contacts: 892, color: "gray" }
  ])

  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>([
    { id: "1", code: "WELCOME10", discount: "10%", type: "percentage", usageLimit: 1000, used: 247, expiresAt: "2024-02-28" },
    { id: "2", code: "VIP20", discount: "20%", type: "percentage", usageLimit: 500, used: 156, expiresAt: "2024-03-31" },
    { id: "3", code: "FIRST50", discount: "€50", type: "fixed", usageLimit: 100, used: 89, expiresAt: "2024-01-31" }
  ])

  const landingTemplates: LandingTemplate[] = [
    {
      id: "template1",
      name: "Black Friday Exclusiva",
      description: "Template moderno com countdown e formulário de captura",
      preview: "bg-gradient-to-br from-gray-900 to-gray-800",
      category: "Promoção"
    },
    {
      id: "template2",
      name: "Lançamento de Produto",
      description: "Design minimalista focado em conversão",
      preview: "bg-gradient-to-br from-blue-600 to-blue-800",
      category: "Lançamento"
    },
    {
      id: "template3",
      name: "Acesso VIP",
      description: "Página exclusiva com senha para membros VIP",
      preview: "bg-gradient-to-br from-purple-600 to-pink-600",
      category: "VIP"
    }
  ]

  const stats = {
    totalSent: 15420,
    deliveryRate: 99.2,
    clickRate: 23.4,
    activeContacts: 8542,
    revenue: 125450,
    avgRevenue: 8.14
  }

  const getLiquidCode = (templateId: string) => {
    const codes: Record<string, string> = {
      template1: `<!-- ActiveText Landing Page - Black Friday -->
<div class="activetext-landing" style="min-height: 100vh; background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 40px 20px;">
  <div style="max-width: 600px; margin: 0 auto; text-align: center;">
    <h1 style="color: #fff; font-size: 48px; margin-bottom: 20px;">🔥 Black Friday Exclusiva</h1>
    <p style="color: #ccc; font-size: 20px; margin-bottom: 40px;">Cadastre-se e receba 50% OFF por SMS</p>
    
    <form action="{{ shop.url }}/apps/activetext/subscribe" method="POST" style="background: white; padding: 30px; border-radius: 12px;">
      <input type="text" name="name" placeholder="Seu nome" style="width: 100%; padding: 15px; margin-bottom: 15px; border: 1px solid #ddd; border-radius: 8px; font-size: 16px;" required>
      <input type="tel" name="phone" placeholder="+351 91 234 5678" style="width: 100%; padding: 15px; margin-bottom: 15px; border: 1px solid #ddd; border-radius: 8px; font-size: 16px;" required>
      <button type="submit" style="width: 100%; padding: 15px; background: #2563eb; color: white; border: none; border-radius: 8px; font-size: 18px; font-weight: bold; cursor: pointer;">Quero 50% OFF!</button>
    </form>
    
    <p style="color: #999; font-size: 12px; margin-top: 20px;">Ao cadastrar, você aceita receber SMS marketing</p>
  </div>
</div>`,
      template2: `<!-- ActiveText Landing Page - Lançamento -->
<div class="activetext-landing" style="min-height: 100vh; background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); padding: 40px 20px;">
  <div style="max-width: 600px; margin: 0 auto; text-align: center;">
    <h1 style="color: #fff; font-size: 48px; margin-bottom: 20px;">✨ Novo Produto</h1>
    <p style="color: #e0e7ff; font-size: 20px; margin-bottom: 40px;">Seja o primeiro a saber do lançamento</p>
    
    <form action="{{ shop.url }}/apps/activetext/subscribe" method="POST" style="background: white; padding: 30px; border-radius: 12px;">
      <input type="tel" name="phone" placeholder="Seu telefone" style="width: 100%; padding: 15px; margin-bottom: 15px; border: 1px solid #ddd; border-radius: 8px; font-size: 16px;" required>
      <input type="email" name="email" placeholder="Seu email (opcional)" style="width: 100%; padding: 15px; margin-bottom: 15px; border: 1px solid #ddd; border-radius: 8px; font-size: 16px;">
      <button type="submit" style="width: 100%; padding: 15px; background: #2563eb; color: white; border: none; border-radius: 8px; font-size: 18px; font-weight: bold; cursor: pointer;">Quero Acesso Antecipado</button>
    </form>
  </div>
</div>`,
      template3: `<!-- ActiveText Landing Page - VIP -->
<div class="activetext-landing" style="min-height: 100vh; background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%); padding: 40px 20px;">
  <div style="max-width: 600px; margin: 0 auto; text-align: center;">
    <h1 style="color: #fff; font-size: 48px; margin-bottom: 20px;">👑 Área VIP</h1>
    <p style="color: #fce7f3; font-size: 20px; margin-bottom: 40px;">Acesso exclusivo para membros</p>
    
    <form action="{{ shop.url }}/apps/activetext/vip-access" method="POST" style="background: white; padding: 30px; border-radius: 12px;">
      <input type="password" name="password" placeholder="Senha VIP" style="width: 100%; padding: 15px; margin-bottom: 15px; border: 1px solid #ddd; border-radius: 8px; font-size: 16px;" required>
      <input type="tel" name="phone" placeholder="Seu telefone" style="width: 100%; padding: 15px; margin-bottom: 15px; border: 1px solid #ddd; border-radius: 8px; font-size: 16px;" required>
      <button type="submit" style="width: 100%; padding: 15px; background: #9333ea; color: white; border: none; border-radius: 8px; font-size: 18px; font-weight: bold; cursor: pointer;">Acessar Área VIP</button>
    </form>
    
    <p style="color: #fce7f3; font-size: 14px; margin-top: 20px;">Não tem acesso VIP? <a href="/pages/vip-signup" style="color: white; text-decoration: underline;">Cadastre-se aqui</a></p>
  </div>
</div>`
    }
    return codes[templateId] || ""
  }

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      // Fallback: create a temporary textarea
      const textarea = document.createElement('textarea')
      textarea.value = code
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      try {
        document.execCommand('copy')
        setCopySuccess(true)
        setTimeout(() => setCopySuccess(false), 2000)
      } catch (e) {
        console.error('Failed to copy:', e)
      }
      document.body.removeChild(textarea)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2.5 rounded-xl shadow-lg">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-blue-600">
                  ActiveText: SMS Marketing
                </h1>
                <p className="text-sm text-gray-600">Plataforma completa de SMS Marketing</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700 shadow-lg">
                    <Gift className="w-4 h-4 mr-2" />
                    Teste Grátis 14 Dias
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">Comece seu Teste Grátis</DialogTitle>
                    <DialogDescription>
                      14 dias grátis • 500 SMS inclusos • Sem cartão de crédito
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Nome Completo</Label>
                      <Input id="signup-name" placeholder="João Silva" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input id="signup-email" type="email" placeholder="joao@empresa.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-phone">Telefone</Label>
                      <Input id="signup-phone" type="tel" placeholder="+351 91 234 5678" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-company">Nome da Empresa</Label>
                      <Input id="signup-company" placeholder="Minha Loja" />
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div className="space-y-1">
                          <p className="text-sm font-semibold">O que você ganha:</p>
                          <ul className="text-xs text-gray-600 space-y-1">
                            <li>✓ 500 SMS grátis para testar</li>
                            <li>✓ Todos os recursos Professional</li>
                            <li>✓ Suporte prioritário</li>
                            <li>✓ Cancele quando quiser</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700" 
                      size="lg"
                      onClick={() => {
                        setIsSignupOpen(false)
                        setIsLandingBuilderOpen(true)
                      }}
                    >
                      <Sparkles className="w-5 h-5 mr-2" />
                      Criar Minha Conta Grátis
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Configurações
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg">
                <Plus className="w-4 h-4 mr-2" />
                Nova Campanha
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Landing Page Builder Dialog */}
      <Dialog open={isLandingBuilderOpen} onOpenChange={setIsLandingBuilderOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">🚀 Teste Prático: Crie sua Landing Page</DialogTitle>
            <DialogDescription>
              Escolha um template profissional e lance sua primeira campanha em minutos
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Template Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Escolha seu Template</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {landingTemplates.map((template) => (
                  <Card 
                    key={template.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedTemplate === template.id ? 'ring-2 ring-blue-600' : ''
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <CardHeader className="p-0">
                      <div className={`h-32 ${template.preview} rounded-t-lg flex items-center justify-center`}>
                        <FileText className="w-12 h-12 text-white opacity-50" />
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{template.name}</h4>
                          <Badge variant="outline" className="mt-1">{template.category}</Badge>
                        </div>
                        {selectedTemplate === template.id && (
                          <CheckCircle2 className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                      <p className="text-xs text-gray-600">{template.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Template Versions */}
            {selectedTemplate && (
              <div className="space-y-4">
                <Separator />
                <div>
                  <h3 className="text-lg font-semibold mb-4">Versões do Template</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {/* Version 1 */}
                    <Card className="border-2">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm">Versão 1: Clássica</CardTitle>
                          <Badge>Recomendada</Badge>
                        </div>
                        <CardDescription className="text-xs">
                          Layout tradicional com foco em conversão
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="bg-gray-50 p-4 rounded-lg border text-xs">
                          <p className="font-semibold mb-2">Características:</p>
                          <ul className="space-y-1 text-gray-600">
                            <li>• Formulário centralizado</li>
                            <li>• Call-to-action destacado</li>
                            <li>• Design responsivo</li>
                          </ul>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          <Eye className="w-4 h-4 mr-2" />
                          Visualizar
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Version 2 */}
                    <Card className="border-2">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm">Versão 2: Moderna</CardTitle>
                          <Badge variant="outline">Popular</Badge>
                        </div>
                        <CardDescription className="text-xs">
                          Design minimalista com animações
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="bg-gray-50 p-4 rounded-lg border text-xs">
                          <p className="font-semibold mb-2">Características:</p>
                          <ul className="space-y-1 text-gray-600">
                            <li>• Gradientes modernos</li>
                            <li>• Micro-interações</li>
                            <li>• Otimizada para mobile</li>
                          </ul>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          <Eye className="w-4 h-4 mr-2" />
                          Visualizar
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Version 3 */}
                    <Card className="border-2">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm">Versão 3: Premium</CardTitle>
                          <Badge variant="secondary">Exclusiva</Badge>
                        </div>
                        <CardDescription className="text-xs">
                          Layout sofisticado com countdown
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="bg-gray-50 p-4 rounded-lg border text-xs">
                          <p className="font-semibold mb-2">Características:</p>
                          <ul className="space-y-1 text-gray-600">
                            <li>• Timer de contagem regressiva</li>
                            <li>• Prova social integrada</li>
                            <li>• Validação em tempo real</li>
                          </ul>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          <Eye className="w-4 h-4 mr-2" />
                          Visualizar
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Separator />

                {/* Liquid Code Section */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Código Liquid para Shopify</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowLiquidCode(!showLiquidCode)}
                    >
                      {showLiquidCode ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                      {showLiquidCode ? 'Ocultar' : 'Mostrar'} Código
                    </Button>
                  </div>

                  {showLiquidCode && (
                    <div className="space-y-3">
                      <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                        <pre className="whitespace-pre-wrap">{getLiquidCode(selectedTemplate)}</pre>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                          onClick={() => handleCopyCode(getLiquidCode(selectedTemplate))}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          {copySuccess ? 'Copiado!' : 'Copiar Código Liquid'}
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Download className="w-4 h-4 mr-2" />
                          Baixar Arquivo
                        </Button>
                      </div>

                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm font-semibold mb-2">📝 Como integrar no Shopify:</p>
                        <ol className="text-xs text-gray-600 space-y-1 list-decimal list-inside">
                          <li>Copie o código Liquid acima</li>
                          <li>No Shopify Admin, vá em <strong>Online Store → Pages</strong></li>
                          <li>Clique em <strong>Add page</strong></li>
                          <li>Cole o código no editor (modo HTML)</li>
                          <li>Publique a página e compartilhe o link!</li>
                        </ol>
                      </div>

                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-start gap-3">
                          <Sparkles className="w-5 h-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-semibold mb-1">Integração Automática Disponível</p>
                            <p className="text-xs text-gray-600 mb-2">
                              Instale nosso app nativo do Shopify para integração automática sem código
                            </p>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              Instalar App Shopify
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLandingBuilderOpen(false)}>
              Voltar
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              disabled={!selectedTemplate}
              onClick={() => {
                setIsLandingBuilderOpen(false)
                // Aqui você pode adicionar lógica para salvar o template escolhido
              }}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Publicar Landing Page
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border shadow-sm">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="collectors">Coletores</TabsTrigger>
            <TabsTrigger value="campaigns">Campanhas</TabsTrigger>
            <TabsTrigger value="automations">Automações</TabsTrigger>
            <TabsTrigger value="contacts">Contatos</TabsTrigger>
            <TabsTrigger value="segments">Segmentos</TabsTrigger>
            <TabsTrigger value="discounts">Descontos</TabsTrigger>
            <TabsTrigger value="vip-access">Acesso VIP</TabsTrigger>
            <TabsTrigger value="integrations">Integrações</TabsTrigger>
            <TabsTrigger value="pricing">Preços</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="border-l-4 border-l-blue-500 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Enviados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold">{formatNumber(stats.totalSent)}</p>
                      <p className="text-xs text-green-600 mt-1">+12.5% vs mês anterior</p>
                    </div>
                    <Send className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Taxa de Entrega</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold">{stats.deliveryRate}%</p>
                      <p className="text-xs text-green-600 mt-1">Excelente performance</p>
                    </div>
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Taxa de Cliques (CTR)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold">{stats.clickRate}%</p>
                      <p className="text-xs text-green-600 mt-1">+3.2% vs mês anterior</p>
                    </div>
                    <MousePointerClick className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Contatos Ativos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold">{formatNumber(stats.activeContacts)}</p>
                      <p className="text-xs text-green-600 mt-1">+245 novos esta semana</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-emerald-500 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Receita Total</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold">€{formatNumber(stats.revenue)}</p>
                      <p className="text-xs text-green-600 mt-1">+18.7% vs mês anterior</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-emerald-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Receita Média/SMS</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold">€{stats.avgRevenue.toFixed(2)}</p>
                      <p className="text-xs text-green-600 mt-1">+5.4% vs mês anterior</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Campaigns */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Campanhas Recentes</CardTitle>
                <CardDescription>Últimas campanhas enviadas e agendadas com métricas de performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaigns.slice(0, 3).map((campaign) => (
                    <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">{campaign.name}</h3>
                          <Badge variant={campaign.status === "sent" ? "default" : campaign.status === "scheduled" ? "secondary" : "outline"}>
                            {campaign.status === "sent" ? "Enviada" : campaign.status === "scheduled" ? "Agendada" : "Rascunho"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2 bg-gray-50 p-2 rounded">{campaign.message}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Send className="w-3 h-3" /> {formatNumber(campaign.sent)} enviados
                          </span>
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> {formatNumber(campaign.delivered)} entregues
                          </span>
                          <span className="flex items-center gap-1">
                            <MousePointerClick className="w-3 h-3" /> {formatNumber(campaign.clicked)} cliques
                          </span>
                          <span className="flex items-center gap-1 text-green-600 font-semibold">
                            <DollarSign className="w-3 h-3" /> €{formatNumber(campaign.revenue)}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">{new Date(campaign.date).toLocaleDateString('pt-PT')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Segments */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Segmentos Principais</CardTitle>
                  <CardDescription>Seus segmentos mais valiosos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {segments.map((segment) => (
                      <div key={segment.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full bg-${segment.color}-500`}></div>
                          <div>
                            <p className="font-semibold text-sm">{segment.name}</p>
                            <p className="text-xs text-gray-500">{segment.criteria}</p>
                          </div>
                        </div>
                        <Badge variant="secondary">{segment.contacts} contatos</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Automações Ativas</CardTitle>
                  <CardDescription>Fluxos automáticos gerando receita</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {automations.filter(a => a.status === "active").slice(0, 4).map((automation) => (
                      <div key={automation.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Zap className="w-5 h-5 text-green-500" />
                          <div>
                            <p className="font-semibold text-sm">{automation.name}</p>
                            <p className="text-xs text-gray-500">{automation.sent} enviados</p>
                          </div>
                        </div>
                        <p className="text-sm font-semibold text-green-600">€{formatNumber(automation.revenue)}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Collectors Tab */}
          <TabsContent value="collectors" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Coletores de Assinantes</h2>
                <p className="text-gray-600">Capture assinantes através de múltiplos canais</p>
              </div>
              <Dialog open={isCollectorOpen} onOpenChange={setIsCollectorOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Coletor
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Criar Novo Coletor de Assinantes</DialogTitle>
                    <DialogDescription>Configure como você vai coletar novos assinantes de SMS</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Tipo de Coletor</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="popup">Pop-up no Site</SelectItem>
                          <SelectItem value="form">Formulário Embarcado</SelectItem>
                          <SelectItem value="landing">Landing Page</SelectItem>
                          <SelectItem value="keyword">Opt-in por Palavra-chave</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="collector-name">Nome do Coletor</Label>
                      <Input id="collector-name" placeholder="Ex: Pop-up Black Friday" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="collector-message">Mensagem de Boas-vindas</Label>
                      <Textarea 
                        id="collector-message" 
                        placeholder="Mensagem enviada após opt-in..."
                        className="min-h-24"
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                      <div className="space-y-1">
                        <Label>Dupla Confirmação (Double Opt-in)</Label>
                        <p className="text-xs text-gray-500">Enviar SMS de confirmação antes de adicionar à lista</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="collector-tags">Tags Automáticas</Label>
                      <Input id="collector-tags" placeholder="Ex: Newsletter, Promoções" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCollectorOpen(false)}>Cancelar</Button>
                    <Button className="bg-blue-600">Criar Coletor</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Pop-up Collector */}
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
                        <MousePointerClick className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle>Pop-up no Site</CardTitle>
                        <CardDescription>Capture visitantes com pop-ups</CardDescription>
                      </div>
                    </div>
                    <Badge variant="default">Ativo</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed">
                    <p className="text-sm font-medium mb-2">📱 Ganhe 10% OFF na primeira compra!</p>
                    <p className="text-xs text-gray-600 mb-3">Cadastre seu número e receba ofertas exclusivas por SMS</p>
                    <Input placeholder="+351 91 234 5678" className="mb-2" />
                    <Button size="sm" className="w-full">Quero o Desconto!</Button>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Conversões hoje:</span>
                    <span className="font-semibold">47 assinantes</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Code className="w-4 h-4 mr-2" />
                      Ver Código
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Settings className="w-4 h-4 mr-2" />
                      Configurar
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Form Collector */}
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle>Formulário Embarcado</CardTitle>
                        <CardDescription>Adicione formulários em qualquer página</CardDescription>
                      </div>
                    </div>
                    <Badge variant="default">Ativo</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg border">
                    <p className="text-sm font-medium mb-3">📬 Receba nossas novidades</p>
                    <div className="space-y-2">
                      <Input placeholder="Seu nome" size={32} />
                      <Input placeholder="Seu telefone" />
                      <div className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1" />
                        <p className="text-xs text-gray-600">Aceito receber SMS marketing</p>
                      </div>
                      <Button size="sm" className="w-full">Cadastrar</Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Conversões hoje:</span>
                    <span className="font-semibold">32 assinantes</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Code className="w-4 h-4 mr-2" />
                      Ver Código
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Settings className="w-4 h-4 mr-2" />
                      Configurar
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Landing Page Collector */}
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle>Landing Page</CardTitle>
                        <CardDescription>Página dedicada para captura</CardDescription>
                      </div>
                    </div>
                    <Badge variant="default">Ativo</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border">
                    <p className="text-lg font-bold mb-2">🎁 Black Friday Exclusiva!</p>
                    <p className="text-sm text-gray-600 mb-3">Cadastre-se e seja o primeiro a receber as ofertas por SMS</p>
                    <div className="bg-white p-3 rounded-lg">
                      <Input placeholder="Seu telefone" className="mb-2" />
                      <Button size="sm" className="w-full">Quero Participar!</Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">URL:</span>
                    <span className="font-mono text-xs text-blue-600">activetext.co/bf2024</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      Visualizar
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Settings className="w-4 h-4 mr-2" />
                      Editar
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Keyword Opt-in Collector */}
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
                        <MessageSquare className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle>Opt-in por Palavra-chave</CardTitle>
                        <CardDescription>Cadastro via SMS com palavra-chave</CardDescription>
                      </div>
                    </div>
                    <Badge variant="default">Ativo</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                    <p className="text-sm font-medium mb-2">📱 Como funciona:</p>
                    <div className="bg-white p-3 rounded-lg mb-2">
                      <p className="text-xs text-gray-600 mb-1">Envie SMS para:</p>
                      <p className="font-mono font-bold text-lg">+351 91 999 0000</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">Com a palavra-chave:</p>
                      <p className="font-mono font-bold text-lg">PROMO</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Cadastros hoje:</span>
                    <span className="font-semibold">18 assinantes</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Copy className="w-4 h-4 mr-2" />
                      Copiar Info
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Settings className="w-4 h-4 mr-2" />
                      Configurar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Consent Management */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Gerenciamento de Consentimento</CardTitle>
                <CardDescription>Conformidade com LGPD e regulamentações de SMS</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">Dupla Confirmação</p>
                      <Switch defaultChecked />
                    </div>
                    <p className="text-xs text-gray-600">Enviar SMS de confirmação antes de adicionar à lista</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">Link de Cancelamento</p>
                      <Switch defaultChecked />
                    </div>
                    <p className="text-xs text-gray-600">Incluir link para cancelar assinatura em todos os SMS</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">Registro de Consentimento</p>
                      <Badge variant="default">Ativo</Badge>
                    </div>
                    <p className="text-xs text-gray-600">Armazenar data, hora e origem do consentimento</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-semibold text-sm">Conformidade Total</p>
                      <p className="text-xs text-gray-600">Sua plataforma está 100% em conformidade com LGPD</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Ver Relatório</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="space-y-6">
            <p className="text-gray-600">Conteúdo de campanhas...</p>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Integrações</h2>
              <p className="text-gray-600">Conecte o ActiveText com suas ferramentas favoritas</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Shopify Integration */}
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center">
                        <ShoppingCart className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle>Shopify</CardTitle>
                        <CardDescription>E-commerce</CardDescription>
                      </div>
                    </div>
                    <Badge className="bg-green-500">Conectado</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600">Aplicativo nativo para Shopify. Sincronize pedidos, clientes e automações.</p>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Sincronização automática de clientes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Carrinho abandonado automático</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Notificações de pedidos</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Configurar
                  </Button>
                </CardContent>
              </Card>

              {/* Twilio Integration */}
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center">
                        <Smartphone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle>Twilio</CardTitle>
                        <CardDescription>SMS Provider</CardDescription>
                      </div>
                    </div>
                    <Badge className="bg-green-500">Conectado</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600">Provedor de SMS com cobertura global e alta confiabilidade.</p>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Cobertura em 180+ países</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Taxa de entrega 99.9%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Números locais disponíveis</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Configurar
                  </Button>
                </CardContent>
              </Card>

              {/* MessageBird Integration */}
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
                        <MessageSquare className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle>MessageBird</CardTitle>
                        <CardDescription>SMS Provider</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline">Disponível</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600">Plataforma de comunicação omnichannel com SMS de alta qualidade.</p>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-500">Rotas premium disponíveis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-500">API REST completa</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-500">Suporte 24/7</span>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Conectar
                  </Button>
                </CardContent>
              </Card>

              {/* Sinch Integration */}
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
                        <Send className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle>Sinch</CardTitle>
                        <CardDescription>SMS Provider</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline">Disponível</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600">Infraestrutura global de SMS com recursos avançados de entrega.</p>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-500">Otimização de rotas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-500">Números virtuais</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-500">Analytics em tempo real</span>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Conectar
                  </Button>
                </CardContent>
              </Card>

              {/* Vonage Integration */}
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
                        <Smartphone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle>Vonage</CardTitle>
                        <CardDescription>SMS Provider</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline">Disponível</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600">Plataforma de comunicação empresarial com SMS confiável.</p>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-500">Verificação em 2 etapas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-500">SMS conversacional</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-500">Webhooks avançados</span>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Conectar
                  </Button>
                </CardContent>
              </Card>

              {/* Stripe Integration */}
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle>Stripe</CardTitle>
                        <CardDescription>Billing & Payments</CardDescription>
                      </div>
                    </div>
                    <Badge className="bg-green-500">Conectado</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600">Processamento de pagamentos e gerenciamento de assinaturas.</p>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Cobrança recorrente automática</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Gestão de planos SaaS</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Faturamento automático</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Configurar
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Pricing Tab */}
          <TabsContent value="pricing" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Preços</h2>
              <p className="text-gray-600">Escolha o plano ideal para o seu negócio</p>
            </div>

            {/* Pricing Plans */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Starter Plan */}
              <Card className="shadow-md hover:shadow-lg transition-shadow border-2">
                <CardHeader>
                  <div className="text-center space-y-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2">Starter</h3>
                      <p className="text-sm text-gray-600">Para marcas começando com SMS</p>
                    </div>
                    <div>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-5xl font-bold">€29</span>
                        <span className="text-gray-600">/mês</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Separator />
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Campanhas e automações, e segmentos ilimitados</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Número toll-free dedicado</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Ferramentas de aquisição de assinantes, com 2 palavras-chave opt-in</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Subdomínio de link curto personalizado</span>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                    Começar Teste Grátis
                  </Button>
                </CardContent>
              </Card>

              {/* Growth Plan */}
              <Card className="shadow-lg hover:shadow-xl transition-shadow border-2 border-blue-500 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600">Mais Popular</Badge>
                </div>
                <CardHeader>
                  <div className="text-center space-y-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2">Growth</h3>
                      <p className="text-sm text-gray-600">Para marcas construindo seu programa de SMS</p>
                    </div>
                    <div>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-5xl font-bold">€35</span>
                        <span className="text-gray-600">/mês</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Separator />
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Tudo do Starter, mais:</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Palavras-chave opt-in ilimitadas</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Suporte por chat ao vivo e email</span>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                    Começar Teste Grátis
                  </Button>
                </CardContent>
              </Card>

              {/* Pro Plan */}
              <Card className="shadow-md hover:shadow-lg transition-shadow border-2">
                <CardHeader>
                  <div className="text-center space-y-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2">Pro</h3>
                      <p className="text-sm text-gray-600">Para marcas escalando SMS como principal canal de receita</p>
                    </div>
                    <div>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-5xl font-bold">€55</span>
                        <span className="text-gray-600">/mês</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Separator />
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Tudo do Growth, mais:</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Analytics avançado</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Suporte prioritário por chat/email</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Acesso à API para integrações customizadas</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">"Powered by Postscript" removido do opt-in</span>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                    Começar Teste Grátis
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Pay-as-you-go */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Créditos Pay-as-you-go</CardTitle>
                <CardDescription>Compre créditos de SMS conforme necessário, sem compromisso mensal</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer">
                    <div className="text-center">
                      <p className="text-2xl font-bold mb-1">1.000</p>
                      <p className="text-xs text-gray-600 mb-3">SMS</p>
                      <p className="text-xl font-bold text-blue-600 mb-3">€50</p>
                      <p className="text-xs text-gray-500">€0,05 por SMS</p>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer">
                    <div className="text-center">
                      <p className="text-2xl font-bold mb-1">5.000</p>
                      <p className="text-xs text-gray-600 mb-3">SMS</p>
                      <p className="text-xl font-bold text-blue-600 mb-3">€200</p>
                      <p className="text-xs text-gray-500">€0,04 por SMS</p>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer">
                    <div className="text-center">
                      <p className="text-2xl font-bold mb-1">10.000</p>
                      <p className="text-xs text-gray-600 mb-3">SMS</p>
                      <p className="text-xl font-bold text-blue-600 mb-3">€350</p>
                      <p className="text-xs text-gray-500">€0,035 por SMS</p>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer">
                    <div className="text-center">
                      <p className="text-2xl font-bold mb-1">25.000</p>
                      <p className="text-xs text-gray-600 mb-3">SMS</p>
                      <p className="text-xl font-bold text-blue-600 mb-3">€750</p>
                      <p className="text-xs text-gray-500">€0,03 por SMS</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-sm">Créditos nunca expiram</p>
                      <p className="text-xs text-gray-600">Use quando quiser, sem prazo de validade</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Free Trial */}
            <Card className="shadow-md bg-gradient-to-br from-blue-50 to-white border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-blue-600" />
                  Teste Grátis por 14 Dias
                </CardTitle>
                <CardDescription>Experimente todos os recursos do plano Professional sem compromisso</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">500 SMS Grátis</p>
                      <p className="text-xs text-gray-600">Para testar suas campanhas</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Sem Cartão de Crédito</p>
                      <p className="text-xs text-gray-600">Comece agora mesmo</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Cancele Quando Quiser</p>
                      <p className="text-xs text-gray-600">Sem compromisso</p>
                    </div>
                  </div>
                </div>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700" 
                  size="lg"
                  onClick={() => setIsSignupOpen(true)}
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Começar Teste Grátis Agora
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Outras tabs mantêm o conteúdo anterior */}
          <TabsContent value="automations" className="space-y-6">
            <p className="text-gray-600">Conteúdo de automações...</p>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-6">
            <p className="text-gray-600">Conteúdo de contatos...</p>
          </TabsContent>

          <TabsContent value="segments" className="space-y-6">
            <p className="text-gray-600">Conteúdo de segmentos...</p>
          </TabsContent>

          <TabsContent value="discounts" className="space-y-6">
            <p className="text-gray-600">Conteúdo de descontos...</p>
          </TabsContent>

          <TabsContent value="vip-access" className="space-y-6">
            <p className="text-gray-600">Conteúdo de acesso VIP...</p>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
