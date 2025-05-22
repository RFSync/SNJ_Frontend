"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Upload, Clock, CheckCircle, File, LinkIcon } from "lucide-react"
import Image from "next/image"

// Define a type for our webhook handler function
type WebhookHandler = (data: { resultUrl: string }) => void

export default function CreatePrint() {
  const [currentStep, setCurrentStep] = useState(0)
  const totalSteps = 3
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Processing state
  const [uploadComplete, setUploadComplete] = useState(false)
  const [soundComplete, setSoundComplete] = useState(false)
  const [transformComplete, setTransformComplete] = useState(false)
  const [resultUrl, setResultUrl] = useState<string | null>(null)
  const [webhookReceived, setWebhookReceived] = useState(false)

  const [isDragging, setIsDragging] = useState(false)

  // Expose webhook handler to window for demo purposes
  useEffect(() => {
    // This simulates receiving a webhook from an external service
    const receiveWebhook = (data: { resultUrl: string }) => {
      console.log("Webhook received:", data)
      setResultUrl(data.resultUrl)
      setWebhookReceived(true)
    }

    // Safely add the function to the window object
    const windowWithWebhook = window as any
    windowWithWebhook.receiveWebhook = receiveWebhook

    return () => {
      // Clean up
      delete windowWithWebhook.receiveWebhook
    }
  }, [])

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isDragging) {
      setIsDragging(true)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      const file = files[0]
      setSelectedFile(file)

      // Create preview URL for image files
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)
      } else {
        setPreviewUrl(null)
      }
    }
  }

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      // If moving from step 1 to step 2, simulate backend call
      if (currentStep === 0) {
        // Simulate backend call
        console.log("Making backend call with file:", selectedFile?.name)

        // Start the processing sequence when entering step 2
        setTimeout(() => {
          setUploadComplete(true)

          // After upload complete, start sound processing
          setTimeout(() => {
            setSoundComplete(true)

            // After sound processing, start transformation
            setTimeout(() => {
              setTransformComplete(true)

              // Now we wait for the webhook to come in
              console.log("Waiting for webhook to complete the process...")

              // For demo purposes, we'll add a button to simulate the webhook after 5 seconds
              setTimeout(() => {
                console.log(
                  "You can now simulate the webhook by running: window.receiveWebhook({ resultUrl: 'https://example.com/your-awesome-figure.glb' })",
                )
              }, 5000)
            }, 2000)
          }, 2000)
        }, 1500)
      }

      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      setSelectedFile(file)

      // Create preview URL for image files
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)
      } else {
        setPreviewUrl(null)
      }
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  // Simulate webhook for demo purposes
  const simulateWebhook = () => {
    const windowWithWebhook = window as any
    if (typeof windowWithWebhook.receiveWebhook === "function") {
      windowWithWebhook.receiveWebhook({ resultUrl: "https://example.com/your-awesome-figure.glb" })
    }
  }

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  // Reset processing states when going back to step 1
  useEffect(() => {
    if (currentStep === 0) {
      setUploadComplete(false)
      setSoundComplete(false)
      setTransformComplete(false)
      setResultUrl(null)
      setWebhookReceived(false)
    }
  }, [currentStep])

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <div className="flex-1 flex flex-col">
        {/* Step indicators */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 py-1 border-b-2 border-cyan-300 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center relative">
              {/* Connecting line */}
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-300 to-pink-300 z-0"></div>

              {[...Array(totalSteps)].map((_, index) => (
                <div key={index} className="flex flex-col items-center z-10">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                      currentStep === index
                        ? "bg-gradient-to-r from-purple-600 to-pink-500 shadow-lg"
                        : currentStep > index
                          ? "bg-gradient-to-r from-cyan-400 to-purple-400"
                          : "bg-gray-300"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span
                    className={`mt-2 text-sm ${currentStep === index ? "text-purple-800 font-bold" : "text-purple-600"}`}
                  >
                    {index === 0 ? "Upload" : index === 1 ? "Process" : "Order"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Carousel content */}
        <div className="flex-1 relative overflow-hidden">
          <div
            className="absolute inset-0 transition-transform duration-500 ease-in-out flex"
            style={{ transform: `translateX(-${currentStep * 100}%)` }}
          >
            {/* Step 1: Upload */}
            <div className="min-w-full h-full flex flex-col items-center justify-center p-4 pt-8">
              <div className="max-w-2xl w-full bg-white/70 backdrop-blur-sm p-6 rounded-lg shadow-xl border-2 border-pink-300">
                <div className="text-center mb-6">
                  <Upload className="h-12 w-12 text-purple-600 mx-auto mb-3" />
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
                    Upload Your Design
                  </h2>
                  <p className="text-purple-800 mt-1">Drag and drop your 3D model file or click to browse</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Preview image */}
                  <div className="flex flex-col items-center justify-center">
                    {selectedFile ? (
                      <>
                        {previewUrl ? (
                          <div className="relative w-full h-48 overflow-hidden rounded-lg border-2 border-purple-300">
                            <Image
                              src={previewUrl || "/placeholder.svg"}
                              alt="File preview"
                              fill
                              className="object-contain"
                            />
                          </div>
                        ) : (
                          <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                            <File className="h-12 w-12 text-purple-600" />
                          </div>
                        )}
                        <p className="text-sm text-purple-600 mt-2">
                          {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                        </p>
                        <button
                          className="mt-2 px-4 py-1 bg-purple-100 text-purple-600 rounded-md hover:bg-purple-200 transition-colors"
                          onClick={() => {
                            setSelectedFile(null)
                            setPreviewUrl(null)
                            if (fileInputRef.current) fileInputRef.current.value = ""
                          }}
                        >
                          Change file
                        </button>
                      </>
                    ) : (
                      <div className="w-full h-48 bg-gray-100 rounded-lg border-2 border-dashed border-purple-300 flex items-center justify-center">
                        <p className="text-purple-600 text-center px-4">No file selected</p>
                      </div>
                    )}
                  </div>

                  {/* Upload instructions */}
                  <div className="flex flex-col">
                    <div
                      className={`flex-1 border-2 border-dashed ${isDragging ? "border-pink-500 bg-pink-50" : "border-purple-300"} rounded-lg p-6 text-center cursor-pointer hover:border-pink-500 transition-colors duration-200 flex flex-col items-center justify-center`}
                      onClick={triggerFileInput}
                      onDragEnter={handleDragEnter}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        accept="image/*,.stl,.obj,.3mf"
                        className="hidden"
                      />
                      <Upload className="h-10 w-10 text-purple-600 mb-3" />
                      <p className="text-purple-800 mb-3">Click to select a file or drag and drop</p>
                      <p className="text-sm text-purple-600 mb-3">Supported formats: .STL, .OBJ, .3MF, and images</p>
                      <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-md shadow-md hover:from-purple-700 hover:to-pink-600 transition-colors duration-200">
                        Select File
                      </button>
                    </div>

                    <div className="mt-4 bg-purple-100 rounded-lg p-4">
                      <h3 className="font-bold text-purple-800 mb-2">Tips:</h3>
                      <ul className="text-purple-700 text-sm space-y-1">
                        <li>• Ensure your model is watertight for best results</li>
                        <li>• Maximum file size: 50MB</li>
                        <li>• Higher resolution images produce better models</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-4">
                  <button className="text-purple-600 hover:text-purple-800 font-medium">Need help?</button>
                  <button
                    onClick={nextStep}
                    disabled={!selectedFile}
                    className={`px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium rounded-md shadow-md transition-colors duration-200 ${
                      !selectedFile ? "opacity-50 cursor-not-allowed" : "hover:from-cyan-600 hover:to-purple-700"
                    }`}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>

            {/* Step 2: Processing */}
            <div className="min-w-full h-full flex flex-col">
              {/* Content */}
              <div className="flex-1 flex flex-col items-center justify-center p-4 pt-8">
                <div className="max-w-2xl w-full bg-white/70 backdrop-blur-sm p-6 rounded-lg shadow-xl border-2 border-cyan-300">
                  <div className="text-center mb-6">
                    <Clock className="h-12 w-12 text-purple-600 mx-auto mb-3" />
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-purple-600 text-transparent bg-clip-text">
                      Processing Your Design
                    </h2>
                    <p className="text-purple-800 mt-1">We're preparing your model for printing</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Preview image */}
                    <div className="flex flex-col items-center justify-center">
                      {previewUrl ? (
                        <div className="relative w-full h-48 overflow-hidden rounded-lg border-2 border-purple-300">
                          <Image
                            src={previewUrl || "/placeholder.svg"}
                            alt="File preview"
                            fill
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                          <p className="text-gray-500">No preview available</p>
                        </div>
                      )}
                      <p className="text-sm text-purple-600 mt-2">
                        {selectedFile?.name} ({selectedFile?.size ? (selectedFile.size / 1024 / 1024).toFixed(2) : 0}{" "}
                        MB)
                      </p>
                    </div>

                    {/* Processing steps */}
                    <div className="bg-purple-100 rounded-lg p-4">
                      <h3 className="font-bold text-purple-800 mb-2">What's happening now:</h3>
                      <ul className="text-purple-700 space-y-2">
                        <li className="flex items-center">
                          {uploadComplete ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          ) : (
                            <div className="h-5 w-5 rounded-full border-2 border-purple-500 border-t-transparent animate-spin mr-2 flex-shrink-0"></div>
                          )}
                          <span>Uploading to mega autosome servers</span>
                        </li>
                        <li className="flex items-center">
                          {uploadComplete ? (
                            soundComplete ? (
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                            ) : (
                              <div className="h-5 w-5 rounded-full border-2 border-purple-500 border-t-transparent animate-spin mr-2 flex-shrink-0"></div>
                            )
                          ) : (
                            <div className="h-5 w-5 rounded-full border-2 border-gray-300 mr-2 flex-shrink-0"></div>
                          )}
                          <span>Adding super awesome sound effects</span>
                        </li>
                        <li className="flex items-start">
                          {soundComplete ? (
                            transformComplete ? (
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                            ) : (
                              <div className="h-5 w-5 rounded-full border-2 border-purple-500 border-t-transparent animate-spin mr-2 flex-shrink-0 mt-1"></div>
                            )
                          ) : (
                            <div className="h-5 w-5 rounded-full border-2 border-gray-300 mr-2 flex-shrink-0 mt-1"></div>
                          )}
                          <div>
                            <span>Transforming you into super awesome figure</span>
                            {soundComplete && !transformComplete && (
                              <p className="text-xs text-pink-500 mt-1">
                                This might take a bit, but it'll be totally worth it! 🚀
                              </p>
                            )}
                          </div>
                        </li>
                        <li className="flex items-center">
                          {transformComplete ? (
                            webhookReceived ? (
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                            ) : (
                              <div className="h-5 w-5 rounded-full border-2 border-purple-500 border-t-transparent animate-spin mr-2 flex-shrink-0"></div>
                            )
                          ) : (
                            <div className="h-5 w-5 rounded-full border-2 border-gray-300 mr-2 flex-shrink-0"></div>
                          )}
                          <span>Finalizing your masterpiece</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* For demo purposes only - this would not exist in production */}
                  {transformComplete && !webhookReceived && (
                    <div className="mb-6 p-3 bg-yellow-100 border border-yellow-300 rounded-md">
                      <p className="text-yellow-800 text-sm">
                        <strong>Demo Note:</strong> In a real application, this step would complete when a webhook is
                        received from the server. For demo purposes, you can simulate this by clicking the button below.
                      </p>
                      <button
                        onClick={simulateWebhook}
                        className="mt-2 px-4 py-1 bg-yellow-200 text-yellow-800 rounded-md hover:bg-yellow-300 transition-colors text-sm"
                      >
                        Simulate Webhook Response
                      </button>
                    </div>
                  )}

                  <div className="flex justify-between mt-4">
                    <button
                      onClick={prevStep}
                      className="px-6 py-2 border-2 border-purple-600 text-purple-600 font-medium rounded-md shadow-md hover:bg-purple-600 hover:text-white transition-colors duration-200"
                    >
                      Back
                    </button>
                    <button
                      onClick={nextStep}
                      disabled={!webhookReceived}
                      className={`px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium rounded-md shadow-md transition-colors duration-200 ${
                        !webhookReceived ? "opacity-50 cursor-not-allowed" : "hover:from-cyan-600 hover:to-purple-700"
                      }`}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Confirm and Order */}
            <div className="min-w-full h-full flex flex-col items-center justify-center p-8">
              <div className="max-w-2xl w-full bg-white/70 backdrop-blur-sm p-8 rounded-lg shadow-xl border-2 border-pink-300">
                <div className="text-center mb-8">
                  <CheckCircle className="h-16 w-16 text-purple-600 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
                    Confirm and Order
                  </h2>
                  <p className="text-purple-800 mt-2">Your design is ready to print!</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="font-bold text-purple-800 mb-2">Print Preview</h3>
                    <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center overflow-hidden">
                      {previewUrl ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={previewUrl || "/placeholder.svg"}
                            alt="File preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <p className="text-gray-500">Preview Image</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-purple-800 mb-2">Print Details</h3>
                    <div className="space-y-2 text-purple-700">
                      <p>
                        <span className="font-medium">Dimensions:</span> 10cm x 8cm x 5cm
                      </p>
                      <p>
                        <span className="font-medium">Material:</span> PLA
                      </p>
                      <p>
                        <span className="font-medium">Color:</span> Neon Pink
                      </p>
                      <p>
                        <span className="font-medium">Estimated Print Time:</span> 4 hours
                      </p>
                      <p>
                        <span className="font-medium">Price:</span>{" "}
                        <span className="text-lg font-bold text-purple-800">$49.99</span>
                      </p>
                      {resultUrl && (
                        <div className="mt-4 p-3 bg-purple-100 rounded-lg flex items-center">
                          <LinkIcon className="h-5 w-5 text-purple-600 mr-2" />
                          <a
                            href={resultUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 hover:text-purple-800 underline break-all"
                          >
                            View 3D Model
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="font-bold text-purple-800 mb-2">Shipping Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="p-2 border-2 border-purple-300 rounded-md focus:border-pink-500 focus:outline-none"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="p-2 border-2 border-purple-300 rounded-md focus:border-pink-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Address"
                      className="p-2 border-2 border-purple-300 rounded-md focus:border-pink-500 focus:outline-none md:col-span-2"
                    />
                    <input
                      type="text"
                      placeholder="City"
                      className="p-2 border-2 border-purple-300 rounded-md focus:border-pink-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Postal Code"
                      className="p-2 border-2 border-purple-300 rounded-md focus:border-pink-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={prevStep}
                    className="px-6 py-2 border-2 border-purple-600 text-purple-600 font-medium rounded-md shadow-md hover:bg-purple-600 hover:text-white transition-colors duration-200"
                  >
                    Back
                  </button>
                  <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-md shadow-md hover:from-purple-700 hover:to-pink-600 transition-colors duration-200">
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation arrows */}
        {currentStep > 0 && (
          <button
            onClick={prevStep}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm text-purple-800 p-3 rounded-full hover:bg-white/50 transition-colors duration-200 z-10"
            aria-label="Previous step"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {currentStep < totalSteps - 1 && currentStep !== 1 && (
          <button
            onClick={nextStep}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm text-purple-800 p-3 rounded-full hover:bg-white/50 transition-colors duration-200 z-10"
            aria-label="Next step"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  )
}
