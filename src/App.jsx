import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Heart, Users, Target, DollarSign, CreditCard, Smartphone, Banknote } from 'lucide-react'
import './App.css'

function App() {
  const [donationForm, setDonationForm] = useState({
    donor_name: '',
    donor_email: '',
    amount: '',
    rotarian_name: '',
    message: '',
    payment_method: 'mobile_money'
  })
  const [submitted, setSubmitted] = useState(false)
  const [stats, setStats] = useState({
    total_donations: 2500000,
    total_target: 10000000,
    total_donors: 25,
    progress_percentage: 25
  })

  const handleInputChange = (field, value) => {
    setDonationForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Ici, vous pourriez envoyer les données à un serveur de paiement
    console.log('Don soumis:', donationForm)
    setSubmitted(true)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' F CFA'
  }

  const predefinedAmounts = [50000, 100000, 250000, 500000, 1000000]

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <Heart className="mx-auto h-16 w-16 text-red-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Merci pour votre générosité !</h2>
              <p className="text-gray-600 mb-4">
                Votre don de <strong>{formatCurrency(donationForm.amount)}</strong> a été enregistré.
              </p>
              <p className="text-sm text-gray-500">
                Vous recevrez bientôt les instructions de paiement par email.
              </p>
              <Button 
                onClick={() => {
                  setSubmitted(false)
                  setDonationForm({
                    donor_name: '',
                    donor_email: '',
                    amount: '',
                    rotarian_name: '',
                    message: '',
                    payment_method: 'mobile_money'
                  })
                }}
                className="mt-4"
              >
                Faire un autre don
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* En-tête avec statistiques */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center mb-6">
            <div className="flex justify-center items-center gap-2 mb-4">
              <Heart className="h-8 w-8 text-red-500" />
              <Users className="h-8 w-8 text-blue-600" />
              <Target className="h-8 w-8 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Cagnotte en Ligne
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              Campagne de Collecte de Fonds pour la Drépanocytose
            </p>
            <p className="text-sm text-gray-500">
              Rotary Club de Cotonou le Nautile & Clubs Satellites
            </p>
          </div>

          {/* Barre de progression */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{formatCurrency(stats.total_donations)}</p>
                <p className="text-sm text-gray-600">Collecté</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(stats.total_target)}</p>
                <p className="text-sm text-gray-600">Objectif</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{stats.total_donors}</p>
                <p className="text-sm text-gray-600">Donateurs</p>
              </div>
            </div>
            <Progress value={stats.progress_percentage} className="h-4 mb-2" />
            <p className="text-center text-sm text-gray-600">
              {stats.progress_percentage}% de l'objectif atteint
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulaire de don */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Faire un don
              </CardTitle>
              <CardDescription>
                Votre contribution fait la différence dans la lutte contre la drépanocytose.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Montants prédéfinis */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Montant du don (F CFA)</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {predefinedAmounts.map((amount) => (
                      <Button
                        key={amount}
                        type="button"
                        variant={donationForm.amount === amount.toString() ? "default" : "outline"}
                        onClick={() => handleInputChange('amount', amount.toString())}
                        className="h-12"
                      >
                        {formatCurrency(amount)}
                      </Button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="custom_amount" className="text-sm">Autre montant:</Label>
                    <Input
                      id="custom_amount"
                      type="number"
                      placeholder="Montant personnalisé"
                      value={donationForm.amount}
                      onChange={(e) => handleInputChange('amount', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>

                {/* Informations du donateur */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="donor_name">Nom complet *</Label>
                    <Input
                      id="donor_name"
                      type="text"
                      value={donationForm.donor_name}
                      onChange={(e) => handleInputChange('donor_name', e.target.value)}
                      required
                      placeholder="Votre nom complet"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="donor_email">Email *</Label>
                    <Input
                      id="donor_email"
                      type="email"
                      value={donationForm.donor_email}
                      onChange={(e) => handleInputChange('donor_email', e.target.value)}
                      required
                      placeholder="votre.email@exemple.com"
                    />
                  </div>
                </div>

                {/* Rotarien référent */}
                <div className="space-y-2">
                  <Label htmlFor="rotarian_name">Rotarien qui vous a contacté (optionnel)</Label>
                  <Input
                    id="rotarian_name"
                    type="text"
                    value={donationForm.rotarian_name}
                    onChange={(e) => handleInputChange('rotarian_name', e.target.value)}
                    placeholder="Nom du Rotarien"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">Message de soutien (optionnel)</Label>
                  <Textarea
                    id="message"
                    value={donationForm.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Votre message d'encouragement..."
                    rows={3}
                  />
                </div>

                {/* Méthode de paiement */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Méthode de paiement</Label>
                  <div className="grid grid-cols-1 gap-3">
                    <Button
                      type="button"
                      variant={donationForm.payment_method === 'mobile_money' ? "default" : "outline"}
                      onClick={() => handleInputChange('payment_method', 'mobile_money')}
                      className="flex items-center justify-start gap-3 h-12"
                    >
                      <Smartphone className="h-5 w-5" />
                      Mobile Money (MTN, Moov, etc.)
                    </Button>
                    <Button
                      type="button"
                      variant={donationForm.payment_method === 'bank_transfer' ? "default" : "outline"}
                      onClick={() => handleInputChange('payment_method', 'bank_transfer')}
                      className="flex items-center justify-start gap-3 h-12"
                    >
                      <Banknote className="h-5 w-5" />
                      Virement bancaire
                    </Button>
                    <Button
                      type="button"
                      variant={donationForm.payment_method === 'card' ? "default" : "outline"}
                      onClick={() => handleInputChange('payment_method', 'card')}
                      className="flex items-center justify-start gap-3 h-12"
                    >
                      <CreditCard className="h-5 w-5" />
                      Carte bancaire
                    </Button>
                  </div>
                </div>

                {/* Bouton de soumission */}
                <Button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg"
                  disabled={!donationForm.donor_name || !donationForm.donor_email || !donationForm.amount}
                >
                  Faire un don de {donationForm.amount ? formatCurrency(donationForm.amount) : '0 F CFA'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Informations sur la cause */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Pourquoi votre don est important
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Target className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Financer les soins</h3>
                    <p className="text-sm text-gray-600">
                      Permettre l'accès à des traitements et des suivis médicaux essentiels pour les patients.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Soutenir la recherche</h3>
                    <p className="text-sm text-gray-600">
                      Contribuer au développement de nouvelles thérapies et, à terme, d'un remède.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Heart className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Sensibiliser le public</h3>
                    <p className="text-sm text-gray-600">
                      Informer et éduquer sur la maladie pour une meilleure prévention et prise en charge.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Transparence et sécurité</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">🔒 Paiements sécurisés</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">📊 Suivi transparent</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">🏥 Impact direct</Badge>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Tous les dons sont traçables et utilisés exclusivement pour la lutte contre la drépanocytose. 
                  Un reçu fiscal vous sera envoyé par email.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
