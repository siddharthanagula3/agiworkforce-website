"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, DollarSign, Clock, Users, Sparkles } from "lucide-react"
import Link from "next/link"

export function ROICalculator() {
  const [hoursPerWeek, setHoursPerWeek] = useState(10)
  const [hourlyRate, setHourlyRate] = useState(50)
  const [teamSize, setTeamSize] = useState(5)

  // Calculations
  const weeklySavings = hoursPerWeek * hourlyRate * teamSize
  const monthlySavings = weeklySavings * 4.33
  const yearlySavings = monthlySavings * 12
  const planCost = 20 * teamSize // $20/month per person for Pro plan
  const monthlyCostSavings = monthlySavings - planCost
  const yearlyROI = ((yearlySavings - (planCost * 12)) / (planCost * 12) * 100).toFixed(0)

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-background">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="mb-4">
            <TrendingUp className="h-3 w-3 mr-1" />
            ROI Calculator
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Calculate Your Potential Savings
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how much time and money AGI Workforce can save your team
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Input Card */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Your Current Situation</CardTitle>
              <CardDescription>
                Adjust the values to match your team
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Hours per week */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    Manual hours per week (per person)
                  </label>
                  <span className="text-2xl font-bold text-blue-600">{hoursPerWeek}h</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="40"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1 hour</span>
                  <span>40 hours</span>
                </div>
              </div>

              {/* Hourly rate */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-blue-500" />
                    Average hourly cost
                  </label>
                  <span className="text-2xl font-bold text-blue-600">${hourlyRate}</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="200"
                  step="10"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>$20/hr</span>
                  <span>$200/hr</span>
                </div>
              </div>

              {/* Team size */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-500" />
                    Team size
                  </label>
                  <span className="text-2xl font-bold text-blue-600">{teamSize}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={teamSize}
                  onChange={(e) => setTeamSize(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1 person</span>
                  <span>50 people</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Card */}
          <Card className="border-2 border-blue-500 bg-gradient-to-br from-blue-500/5 to-purple-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-500" />
                Your Potential Savings
              </CardTitle>
              <CardDescription>
                Based on automating {((hoursPerWeek / 40) * 100).toFixed(0)}% of manual work
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Monthly savings */}
              <div className="p-4 rounded-lg bg-card border-2 border-blue-200 dark:border-blue-900">
                <div className="text-sm text-muted-foreground mb-1">Monthly Savings</div>
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ${monthlySavings.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  {hoursPerWeek * teamSize * 4.33} hours saved
                </div>
              </div>

              {/* Yearly savings */}
              <div className="p-4 rounded-lg bg-card border-2 border-purple-200 dark:border-purple-900">
                <div className="text-sm text-muted-foreground mb-1">Yearly Savings</div>
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  ${yearlySavings.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  {(hoursPerWeek * teamSize * 52).toLocaleString()} hours saved
                </div>
              </div>

              {/* ROI */}
              <div className="p-4 rounded-lg bg-success-400/10 border-2 border-success-400/30">
                <div className="text-sm text-muted-foreground mb-1">Return on Investment</div>
                <div className="text-4xl font-bold text-success-400">
                  {yearlyROI}%
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  Annual plan cost: ${(planCost * 12).toLocaleString()}
                </div>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <Button asChild size="lg" className="w-full">
                  <Link href="/download">
                    Start Saving ${monthlyCostSavings.toLocaleString()}/Month
                  </Link>
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-3">
                  14-day free trial • No credit card required
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom stats */}
        <div className="max-w-5xl mx-auto mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Our customers save an average of <span className="font-semibold text-foreground">$47,000</span> in the first month.
            Join <span className="font-semibold text-foreground">10,000+</span> professionals automating their workflows.
          </p>
        </div>
      </div>
    </section>
  )
}
