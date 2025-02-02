"use client"

import React from 'react'
import { useState } from 'react'
import Link from 'next/link';


const Page = () => {

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-lg">
            <h1 className="font-bold">Introducing</h1>
            <span className='text-5xl font-bold'>AI Tasky</span>
            <p className="pt-10 pb-3 text-sm">
              Feeling Jobless and don&apos;t know what to do with your Life😊? 
            </p>
            <p className="pb-10 text-sm">
              Introducing <span className='font-bold'>AI Tasky</span>, Your personalized productivity companion! With just a few details about your interests and goals, our AI helps you create a tailored plan for you.
            </p>
            <Link href={`/AITasky/GenerateTask`}>
              <button className="btn btn-primary">Get Started</button>
            </Link>
            
          </div>
        </div>
      </div>

    </div>
  )
}

export default Page
