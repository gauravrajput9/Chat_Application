import React from "react";
import { MessageCircle, Users, Smile, Camera } from "lucide-react";

const EmptyChatContainer = () => {
  const features = [
    {
      icon: MessageCircle,
      title: "Rich Messaging",
      description: "Send text messages with emoji support"
    },
    {
      icon: Camera,
      title: "Media Sharing",
      description: "Share images and files instantly"
    },
    {
      icon: Users,
      title: "Real-time Status",
      description: "See when contacts are online"
    },
    {
      icon: Smile,
      title: "Sound Effects",
      description: "Enjoy typing sounds and notifications"
    }
  ];

  return (
    <div className="h-full overflow-y-auto custom-scrollbar">
      <div className="flex flex-col items-center justify-center min-h-full text-center p-6 bg-transparent">
        {/* Animated Chat Icon */}
        <div className="relative mb-6 fade-in">
          <div className="w-20 h-20 rounded-full gradient-bg-primary flex items-center justify-center shadow-2xl">
            <div className="w-16 h-16 rounded-full glass-effect flex items-center justify-center">
              <MessageCircle className="w-8 h-8 text-blue-400" strokeWidth={1.5} />
            </div>
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-green-400 flex items-center justify-center smooth-bounce">
            <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-md space-y-4 fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                ChatFlow
              </span>
            </h2>
            <p className="text-base text-gray-300 leading-relaxed">
              Choose a conversation from the sidebar to start messaging.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="glass-effect rounded-xl p-3 card-hover fade-in"
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center mb-2 mx-auto">
                    <Icon className="w-4 h-4 text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-semibold text-white text-xs mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-tight">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Getting Started */}
          <div className="glass-effect rounded-xl p-4 mt-6 fade-in" style={{ animationDelay: '0.8s' }}>
            <h3 className="text-base font-semibold text-white mb-3">Getting Started</h3>
            <div className="space-y-2 text-left">
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-semibold text-blue-400">1</span>
                </div>
                <span className="text-xs">Select a contact from the sidebar</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-semibold text-blue-400">2</span>
                </div>
                <span className="text-xs">Start typing your message</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-semibold text-blue-400">3</span>
                </div>
                <span className="text-xs">Press Enter or click send</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyChatContainer;
