"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Cookie, X, Settings } from "lucide-react"
import { useAnalyticsContext } from "./analytics-provider"

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const { isAnalyticsEnabled, enableAnalytics, disableAnalytics } = useAnalyticsContext()

  useEffect(() => {
    const consent = localStorage.getItem("analytics-consent")
    if (consent === null) {
      setShowBanner(true)
    }
  }, [])

  const handleAcceptAll = () => {
    enableAnalytics()
    setShowBanner(false)
  }

  const handleRejectAll = () => {
    disableAnalytics()
    setShowBanner(false)
  }

  const handleSaveSettings = (analytics: boolean) => {
    if (analytics) {
      enableAnalytics()
    } else {
      disableAnalytics()
    }
    setShowBanner(false)
    setShowSettings(false)
  }

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-md"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6 bg-background/95 backdrop-blur-md border border-white/20">
            <div className="flex items-start gap-3 mb-4">
              <Cookie className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold mb-2">Cookie Preferences</h3>
                <p className="text-sm text-muted-foreground">
                  We use cookies to analyze website traffic and optimize your experience. Your data will be aggregated
                  with all other user data.
                </p>
              </div>
            </div>

            {!showSettings ? (
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <Button onClick={handleAcceptAll} size="sm" className="flex-1">
                    Accept All
                  </Button>
                  <Button onClick={handleRejectAll} variant="outline" size="sm" className="flex-1">
                    Reject All
                  </Button>
                </div>
                <Button onClick={() => setShowSettings(true)} variant="ghost" size="sm" className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Customize
                </Button>
              </div>
            ) : (
              <CookieSettings onSave={handleSaveSettings} onClose={() => setShowSettings(false)} />
            )}
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

interface CookieSettingsProps {
  onSave: (analytics: boolean) => void
  onClose: () => void
}

function CookieSettings({ onSave, onClose }: CookieSettingsProps) {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Cookie Settings</h4>
        <Button onClick={onClose} variant="ghost" size="sm">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Essential Cookies</p>
            <p className="text-xs text-muted-foreground">Required for basic site functionality</p>
          </div>
          <div className="text-sm text-muted-foreground">Always On</div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Analytics Cookies</p>
            <p className="text-xs text-muted-foreground">Help us understand how visitors use our site</p>
          </div>
          <Button
            onClick={() => setAnalyticsEnabled(!analyticsEnabled)}
            variant={analyticsEnabled ? "default" : "outline"}
            size="sm"
          >
            {analyticsEnabled ? "On" : "Off"}
          </Button>
        </div>
      </div>

      <Button onClick={() => onSave(analyticsEnabled)} className="w-full" size="sm">
        Save Preferences
      </Button>
    </div>
  )
}
