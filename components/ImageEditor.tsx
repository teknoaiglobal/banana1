import React, { useState, useCallback } from 'react';
import { generateImageStream } from '../services/geminiService';
import SparkleIcon from './icons/SparkleIcon';

const ImageEditor: React.FC = () => {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedText, setGeneratedText] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<string>('1:1');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!prompt) {
      setError('Please enter a prompt.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);
    setGeneratedText('');
    
    try {
      await generateImageStream(prompt, aspectRatio, (chunk) => {
        if (chunk.text) {
          setGeneratedText(prev => prev + chunk.text);
        }
        if (chunk.image) {
          setGeneratedImage(chunk.image);
        }
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, aspectRatio]);

  const ImageDisplay: React.FC<{ src: string | null; children?: React.ReactNode }> = ({ src, children }) => (
    <div 
        className="w-full max-w-2xl mx-auto bg-gray-800 rounded-lg flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-600 relative overflow-hidden transition-all duration-300"
        style={{ aspectRatio: aspectRatio.replace(':', ' / ') }}
    >
        {src ? <img src={src} alt="Generated" className="max-w-full max-h-full object-contain" /> : children}
    </div>
  );
  
  const aspectRatios = ["1:1", "16:9", "9:16", "4:3", "3:4"];

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col items-center gap-6 mb-32">
        <ImageDisplay src={generatedImage}>
           {isLoading ? (
               <div className="flex flex-col items-center">
                   <SparkleIcon className="h-12 w-12 text-purple-400 animate-pulse" />
                   <p className="mt-2 text-sm text-gray-400">Generating your image...</p>
               </div>
           ) : (
                <div className="text-center">
                    <SparkleIcon className="mx-auto h-12 w-12 text-gray-500" />
                    <p className="mt-2 text-sm text-gray-400">Your generated image will appear here</p>
                </div>
           )}
        </ImageDisplay>
        {generatedText && !isLoading && (
            <div className="w-full max-w-2xl mx-auto bg-gray-800 rounded-lg p-4 animate-fade-in">
                <h3 className="text-lg font-semibold mb-2 text-purple-300">Model's Response</h3>
                <div className="text-gray-300 whitespace-pre-wrap">{generatedText}</div>
            </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-sm border-t border-gray-700 p-4">
        <div className="container mx-auto">
          {error && <p className="text-red-400 text-center text-sm mb-2">{error}</p>}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A futuristic cityscape at sunset, cinematic lighting..."
              className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
              disabled={isLoading}
            />
            <div className="w-full sm:w-auto flex-shrink-0">
                <select
                    value={aspectRatio}
                    onChange={(e) => setAspectRatio(e.target.value)}
                    disabled={isLoading}
                    className="w-full sm:w-28 px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow appearance-none text-center"
                >
                    {aspectRatios.map(ar => <option key={ar} value={ar}>{ar}</option>)}
                </select>
            </div>
            <button
              onClick={handleGenerate}
              disabled={isLoading || !prompt}
              className="w-full sm:w-auto flex-shrink-0 flex items-center justify-center px-6 py-3 font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
            >
              <SparkleIcon className="w-5 h-5 mr-2" />
              {isLoading ? 'Generating...' : 'Generate'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
