import React, { useState, useEffect } from 'react';
import { MapPin, Search, Moon, Sun, X, Leaf, TreePine, Music, Palette, Heart, UtensilsCrossed, Users, Wallet, Scaling as Seedling, Calendar, Award, Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';

const EcoFestivals: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('eco-festivals');
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFestival, setSelectedFestival] = useState<any>(null);
  const [videoPlaying, setVideoPlaying] = useState<{ [key: string]: boolean }>({});
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Update document title
  useEffect(() => {
    document.title = 'Green Horizon - Eco Festivals';
  }, []);

  // Eco festivals data
  const ecoFestivals = [
    {
      name: "Boom Festival",
      location: "Portugal",
      description: "A biennial transformational festival focused on sustainability since 1997. Boom combines music, art, and environmental activism with innovative green technologies and practices. The festival is known for its stunning lakeside location and commitment to creating a temporary utopian community that leaves minimal environmental impact. Attendees can enjoy world-class music performances, art installations, workshops, and a marketplace of sustainable products.",
      image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1000",
      video: "https://player.vimeo.com/external/394498230.sd.mp4?s=7e5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c&profile_id=164&oauth2_token_id=57447761",
      gallery: [
        "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=800"
      ],
      features: [
        "100% renewable energy from solar power with battery storage systems",
        "Biological water treatment plant processes all wastewater on-site",
        "Compost toilets and biodegradable cleaning products throughout",
        "Waste management system achieves 85% recycling through meticulous sorting",
        "Carbon offset program has planted over 10,000 trees in deforested areas",
        "Sustainable art installations made from recycled and natural materials",
        "Local organic food vendors with emphasis on plant-based options"
      ],
      tags: ["Music", "Art", "Sustainability"]
    },
    {
      name: "Burning Man",
      location: "Nevada, USA",
      description: "An annual event and temporary community based on radical self-expression and self-reliance in the Nevada desert. Known for its commitment to Leave No Trace principles and innovative sustainable solutions. The festival creates a temporary city that completely disappears after the event, demonstrating how large gatherings can be environmentally responsible.",
      image: "https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg?auto=compress&cs=tinysrgb&w=1000",
      video: null,
      gallery: [
        "https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800"
      ],
      features: [
        "Strict Leave No Trace policy - entire city must be restored to natural state",
        "MOOP (Matter Out Of Place) cleanup teams ensure zero environmental impact",
        "Solar-powered art installations and camps throughout the event",
        "Water conservation programs and sustainable greywater systems",
        "Bike-only transportation within the event reduces emissions",
        "Reusable and repurposed materials encouraged for all art and structures",
        "Educational workshops on sustainable living and environmental awareness"
      ],
      tags: ["Art", "Community", "Sustainability"]
    },
    {
      name: "Lightning in a Bottle",
      location: "California, USA",
      description: "A transformational music and arts festival that combines cutting-edge music with sustainability education and environmental consciousness. Set in beautiful natural locations, the festival serves as a model for how large events can operate with minimal environmental impact while providing transformative experiences for attendees.",
      image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1000",
      video: null,
      gallery: [
        "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=800"
      ],
      features: [
        "Carbon-neutral event through renewable energy and offset programs",
        "Comprehensive recycling and composting programs with 90% waste diversion",
        "Local and organic food vendors with focus on plant-based options",
        "Educational sustainability workshops and environmental activism zones",
        "Water refill stations throughout venue to eliminate plastic bottles",
        "Carpooling and shuttle programs to reduce transportation emissions",
        "Native habitat restoration projects as part of venue improvement"
      ],
      tags: ["Music", "Education", "Wellness"]
    },
    {
      name: "Fusion Festival",
      location: "Germany",
      description: "A unique arts and music festival in Germany known for its experimental approach to sustainability and community building. The festival operates as a temporary autonomous zone where innovative environmental solutions are tested and implemented, creating a blueprint for sustainable large-scale events.",
      image: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=1000",
      video: null,
      gallery: [
        "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800"
      ],
      features: [
        "Experimental renewable energy systems including wind and biomass",
        "Closed-loop waste management with on-site processing facilities",
        "Community-built infrastructure using sustainable materials",
        "Local food systems with on-site gardens and food production",
        "Water treatment and recycling systems designed by attendees",
        "Alternative transportation methods including electric vehicles",
        "Research partnerships with universities for sustainability innovation"
      ],
      tags: ["Music", "Innovation", "Community"]
    },
    {
      name: "Ozora Festival",
      location: "Hungary",
      description: "A psychedelic trance festival that has become a leader in festival sustainability practices. Set in the beautiful Hungarian countryside, Ozora demonstrates how electronic music events can operate in harmony with nature while creating profound cultural and spiritual experiences.",
      image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1000",
      video: null,
      gallery: [
        "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=800"
      ],
      features: [
        "Renewable energy systems power all stages and facilities",
        "Extensive recycling programs with attendee education campaigns",
        "Organic food courts featuring local Hungarian producers",
        "Natural building techniques used for permanent structures",
        "Ecological restoration projects improve the venue year-round",
        "Water conservation through rainwater harvesting systems",
        "Environmental workshops and sustainability-focused art installations"
      ],
      tags: ["Music", "Spirituality", "Nature"]
    },
    {
      name: "Shambhala Music Festival",
      location: "Canada",
      description: "An electronic music festival in British Columbia that has pioneered many sustainable festival practices. Known for its stunning natural setting and commitment to environmental stewardship, Shambhala shows how music festivals can enhance rather than harm their natural environments.",
      image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1000",
      video: null,
      gallery: [
        "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=800"
      ],
      features: [
        "Hydroelectric power from on-site renewable sources",
        "Comprehensive waste reduction achieving 85% diversion from landfills",
        "Local food vendors with emphasis on organic and sustainable options",
        "Natural water sources protected through advanced filtration systems",
        "Reforestation programs plant trees to offset festival impact",
        "Sustainable building materials used for all permanent structures",
        "Environmental education integrated into the festival experience"
      ],
      tags: ["Music", "Nature", "Education"]
    }
  ];

  // Traditional festivals data
  const traditionalFestivals = [
    {
      name: "Diwali",
      location: "India",
      icon: "🪔",
      budgetSuggestions: [
        "Make DIY clay diyas at home using natural clay and cotton wicks soaked in organic oil",
        "Create rangoli designs with rice flour or flower petals instead of synthetic colors",
        "Organize neighborhood potluck celebrations to share costs",
        "Use old sarees/fabric to make new decorations through upcycling",
        "Make homemade sweets in reusable containers instead of buying packaged",
        "Repurpose old jars and containers as candle holders",
        "Use natural materials like leaves and flowers for decorations"
      ],
      ecoSuggestions: [
        "Use LED lights with timers for decorations to save energy",
        "Donate unused items during pre-festival cleaning to charities",
        "Compost all flower offerings and organic waste after puja",
        "Avoid plastic packaging for gifts and sweets",
        "Use natural materials for decorations that can be composted afterward",
        "Organize community decoration exchanges to reuse items",
        "Plant trees as part of celebrations"
      ]
    },
    {
      name: "Christmas",
      location: "Global",
      icon: "🎄",
      budgetSuggestions: [
        "Make handmade gifts using recycled materials and personal skills",
        "Organize gift exchanges with spending limits to reduce costs",
        "Create decorations from natural materials like pinecones and branches",
        "Host potluck dinners instead of expensive catered meals",
        "Make your own wrapping paper from newspaper or fabric scraps",
        "Buy a living Christmas tree that can be planted after the holidays",
        "Use energy-efficient LED lights for decorations"
      ],
      ecoSuggestions: [
        "Choose locally-grown Christmas trees or rent living trees",
        "Use fabric gift bags or newspaper for eco-friendly wrapping",
        "Donate or exchange decorations with neighbors after the season",
        "Compost organic decorations like real garlands and wreaths",
        "Give experience gifts or donations to charities instead of material items",
        "Use solar-powered outdoor lights for decorations",
        "Buy organic, fair-trade ingredients for holiday cooking"
      ]
    },
    {
      name: "Holi",
      location: "India",
      icon: "🌈",
      budgetSuggestions: [
        "Make organic colors at home using turmeric, beetroot, and spinach",
        "Organize community celebrations to share costs of food and supplies",
        "Use water guns and balloons multiple times instead of single-use items",
        "Make traditional sweets at home rather than buying expensive packaged ones",
        "Create rangoli with homemade colored rice or flower petals",
        "Use old clothes that can be dedicated to Holi celebrations",
        "Prepare natural drinks like thandai and lassi at home"
      ],
      ecoSuggestions: [
        "Use only natural, plant-based colors to avoid skin and environmental damage",
        "Minimize water usage by celebrating with dry colors when possible",
        "Avoid plastic packaging for colors and sweets",
        "Compost all organic waste from food preparation",
        "Use biodegradable plates and cups for community meals",
        "Plant flowers that can be used for making natural colors next year",
        "Clean up celebration areas thoroughly to prevent environmental impact"
      ]
    },
    {
      name: "Chinese New Year",
      location: "China & Global",
      icon: "🏮",
      budgetSuggestions: [
        "Make homemade dumplings and traditional foods with family",
        "Create paper decorations and lanterns using red paper and craft supplies",
        "Organize community lion dance performances to share costs",
        "Give small red envelopes with meaningful amounts rather than expensive gifts",
        "Host potluck reunion dinners with extended family and friends",
        "Make traditional crafts like paper cutting as decorative activities",
        "Use digital greetings cards instead of expensive printed ones"
      ],
      ecoSuggestions: [
        "Use LED lanterns instead of traditional candles for safety and efficiency",
        "Recycle red paper decorations for future celebrations",
        "Choose locally-sourced ingredients for traditional meals",
        "Avoid single-use tableware during reunion dinners",
        "Plant bamboo or other traditional plants as living decorations",
        "Use natural cleaning products after celebration cleanup",
        "Donate used clothing and items during traditional spring cleaning"
      ]
    },
    {
      name: "Halloween",
      location: "USA & Global",
      icon: "🎃",
      budgetSuggestions: [
        "Make costumes from clothes you already own with creative modifications",
        "Carve jack-o'-lanterns from locally grown pumpkins",
        "Organize neighborhood costume swaps to reuse outfits",
        "Make homemade decorations from cardboard and craft supplies",
        "Host costume-making parties to share materials and ideas",
        "Buy candy in bulk and use reusable containers for trick-or-treaters",
        "Create DIY haunted house experiences in your backyard"
      ],
      ecoSuggestions: [
        "Compost pumpkins after Halloween instead of throwing them away",
        "Use battery-powered LED candles in jack-o'-lanterns for safety",
        "Choose face paint over plastic masks when possible",
        "Donate or exchange costumes after Halloween for next year",
        "Use natural materials like leaves and branches for spooky decorations",
        "Give out organic or fair-trade candy options",
        "Avoid single-use plastic decorations that can't be recycled"
      ]
    },
    {
      name: "Easter",
      location: "Global",
      icon: "🐰",
      budgetSuggestions: [
        "Organize community egg hunts to share costs of supplies and treats",
        "Make Easter decorations from natural materials like twigs and flowers",
        "Host potluck Easter brunches instead of expensive restaurant meals",
        "Create homemade Easter baskets from recycled materials",
        "Grow your own herbs and flowers for Easter centerpieces",
        "Make traditional Easter breads and treats at home",
        "Use hard-boiled eggs for both eating and decorating activities"
      ],
      ecoSuggestions: [
        "Use natural dyes from vegetables and fruits to color Easter eggs",
        "Choose locally-sourced, organic ingredients for Easter meals",
        "Plant flowers and herbs in reusable containers as living decorations",
        "Avoid plastic grass and synthetic decorations in Easter baskets",
        "Compost eggshells and organic decorations after the celebration",
        "Use biodegradable or reusable materials for egg hunt supplies",
        "Give seeds or small plants as Easter gifts to promote gardening"
      ]
    }
  ];

  // Filter eco festivals based on search term
  const filteredEcoFestivals = ecoFestivals.filter(festival => 
    festival.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    festival.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    festival.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    festival.features.some(f => f.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (festival.tags && festival.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  // Filter traditional festivals based on search term
  const filteredTraditionalFestivals = traditionalFestivals.filter(festival => 
    festival.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    festival.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    festival.budgetSuggestions.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
    festival.ecoSuggestions.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Swipe card functions
  const nextCard = () => {
    if (isTransitioning || filteredTraditionalFestivals.length === 0) return;
    setIsTransitioning(true);
    setCurrentCardIndex((prev) => (prev + 1) % filteredTraditionalFestivals.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const prevCard = () => {
    if (isTransitioning || filteredTraditionalFestivals.length === 0) return;
    setIsTransitioning(true);
    setCurrentCardIndex((prev) => (prev - 1 + filteredTraditionalFestivals.length) % filteredTraditionalFestivals.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToCard = (index: number) => {
    if (isTransitioning || index === currentCardIndex) return;
    setIsTransitioning(true);
    setCurrentCardIndex(index);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  // Touch handlers for swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextCard();
    } else if (isRightSwipe) {
      prevCard();
    }
  };

  // Reset card index when search results change
  useEffect(() => {
    setCurrentCardIndex(0);
  }, [searchTerm]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode ? 'enabled' : 'disabled');
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  };

  // Toggle video play/pause
  const toggleVideo = (festivalName: string) => {
    setVideoPlaying(prev => ({
      ...prev,
      [festivalName]: !prev[festivalName]
    }));
  };

  // Show festival modal
  const showFestivalModal = (festival: any) => {
    setSelectedFestival(festival);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedFestival(null);
    document.body.style.overflow = 'auto';
  };

  // Close modal when clicking outside content
  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // Close modal with escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalOpen) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalOpen]);

  // Check for saved dark mode preference on component mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'enabled';
    setDarkMode(savedDarkMode);
    
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, []);

  // Determine tag class and icon based on content
  const getTagInfo = (tag: string) => {
    const tagMap: Record<string, { class: string; icon: React.ReactNode }> = {
      "Music": { class: "tag-music", icon: <Music className="w-3 h-3" /> },
      "Art": { class: "tag-art", icon: <Palette className="w-3 h-3" /> },
      "Wellness": { class: "tag-wellness", icon: <Heart className="w-3 h-3" /> },
      "Food": { class: "tag-food", icon: <UtensilsCrossed className="w-3 h-3" /> },
      "Family": { class: "tag-family", icon: <Users className="w-3 h-3" /> },
      "Sustainability": { class: "tag-sustainability", icon: <Leaf className="w-3 h-3" /> },
      "Community": { class: "tag-community", icon: <Users className="w-3 h-3" /> },
      "Education": { class: "tag-education", icon: <Award className="w-3 h-3" /> },
      "Nature": { class: "tag-nature", icon: <TreePine className="w-3 h-3" /> },
      "Innovation": { class: "tag-innovation", icon: <Seedling className="w-3 h-3" /> },
      "Spirituality": { class: "tag-spirituality", icon: <Heart className="w-3 h-3" /> }
    };
    return tagMap[tag] || { class: '', icon: <Calendar className="w-3 h-3" /> };
  };

  // Background animation component
  const AnimatedBackground = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-60">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 via-blue-50/30 to-purple-50/30 dark:from-slate-800/50 dark:via-slate-700/50 dark:to-slate-600/50 animate-gradient-shift"></div>
      
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-green-500/40 dark:bg-green-400/60 rounded-full animate-float-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${10 + Math.random() * 20}s`
          }}
        />
      ))}
      
      {/* Animated waves */}
      <div className="absolute bottom-0 left-0 w-full h-32 opacity-30">
        <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,60 C300,120 600,0 900,60 C1050,90 1150,30 1200,60 L1200,120 L0,120 Z"
            fill="currentColor"
            className="text-green-500/30 dark:text-slate-600/50 animate-wave"
          />
        </svg>
      </div>
      
      {/* Geometric shapes */}
      <div className="absolute top-20 left-20 w-32 h-32 border-2 border-green-400/20 dark:border-slate-500/30 rounded-full animate-spin-slow"></div>
      <div className="absolute bottom-40 right-20 w-24 h-24 border-2 border-blue-400/20 dark:border-slate-400/30 rotate-45 animate-pulse"></div>
      <div className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-r from-purple-400/20 to-pink-400/20 dark:from-slate-600/40 dark:to-slate-500/40 rounded-lg animate-bounce"></div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'dark' : ''}`}>
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Floating Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
          <Leaf className="w-8 h-8 text-green-400 opacity-30" />
        </div>
        <div className="absolute top-32 right-20 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}>
          <TreePine className="w-6 h-6 text-green-500 opacity-25" />
        </div>
        <div className="absolute bottom-32 left-16 animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}>
          <Seedling className="w-7 h-7 text-green-400 opacity-20" />
        </div>
        <div className="absolute top-1/2 right-10 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '3.5s' }}>
          <Music className="w-5 h-5 text-blue-400 opacity-30" />
        </div>
        <div className="absolute bottom-20 right-32 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '4.5s' }}>
          <Heart className="w-6 h-6 text-pink-400 opacity-25" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mb-6 shadow-lg">
            <Leaf className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Eco Festivals
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Discover sustainable celebrations from around the world and learn how to make traditional festivals greener. 
            Join the movement towards environmentally conscious celebrations that inspire and protect our planet.
          </p>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg border border-gray-200 dark:border-gray-700">
            <button 
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'eco-festivals' 
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-md transform scale-105' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400'
              }`}
              onClick={() => setActiveTab('eco-festivals')}
            >
              <Leaf className="w-4 h-4" />
              Eco Festivals
            </button>
            <button 
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'traditional-festivals' 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md transform scale-105' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400'
              }`}
              onClick={() => setActiveTab('traditional-festivals')}
            >
              <Calendar className="w-4 h-4" />
              Traditional Festivals
            </button>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 focus:ring-4 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all duration-300 text-gray-800 dark:text-gray-200 shadow-lg"
              placeholder="Search festivals by name, location, or features..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* Eco Festivals Tab */}
        {activeTab === 'eco-festivals' && (
          <div className="transition-all duration-500 ease-in-out">
            {filteredEcoFestivals.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700">
                <TreePine className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-xl text-gray-600 dark:text-gray-400">No eco festivals found matching your search.</p>
                <p className="text-gray-500 dark:text-gray-500 mt-2">Try different keywords or browse all festivals.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEcoFestivals.map((festival, index) => (
                  <div 
                    key={index} 
                    className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                    onClick={() => showFestivalModal(festival)}
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={festival.image} 
                        alt={festival.name} 
                        className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110" 
                      />
                      {festival.video && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleVideo(festival.name);
                            }}
                            className="bg-black/50 hover:bg-black/70 text-white rounded-full p-4 transition-all duration-300 transform hover:scale-110"
                          >
                            {videoPlaying[festival.name] ? (
                              <Pause className="w-6 h-6" />
                            ) : (
                              <Play className="w-6 h-6" />
                            )}
                          </button>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                      <div className="absolute top-4 right-4">
                        <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                          <Leaf className="w-3 h-3" />
                          Eco
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                        {festival.name}
                      </h3>
                      <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm">{festival.location}</span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                        {festival.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {festival.tags.map((tag, i) => {
                          const tagInfo = getTagInfo(tag);
                          return (
                            <span key={i} className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${tagInfo.class}`}>
                              {tagInfo.icon}
                              {tag}
                            </span>
                          );
                        })}
                      </div>
                      
                      <button 
                        className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          showFestivalModal(festival);
                        }}
                      >
                        Learn More
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Traditional Festivals Tab */}
        {activeTab === 'traditional-festivals' && (
          <div className="transition-all duration-500 ease-in-out">
            {filteredTraditionalFestivals.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-xl text-gray-600 dark:text-gray-400">No traditional festivals found matching your search.</p>
                <p className="text-gray-500 dark:text-gray-500 mt-2">Try different keywords or browse all festivals.</p>
              </div>
            ) : (
              <div className="relative max-w-4xl mx-auto">
                {/* Card Container */}
                <div 
                  className="relative h-[600px] overflow-hidden rounded-3xl"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {filteredTraditionalFestivals.map((festival, index) => {
                    const isActive = index === currentCardIndex;
                    const isPrev = index === (currentCardIndex - 1 + filteredTraditionalFestivals.length) % filteredTraditionalFestivals.length;
                    const isNext = index === (currentCardIndex + 1) % filteredTraditionalFestivals.length;
                    
                    let transform = 'translateX(100%) scale(0.8)';
                    let opacity = 0;
                    let zIndex = 1;
                    
                    if (isActive) {
                      transform = 'translateX(0%) scale(1)';
                      opacity = 1;
                      zIndex = 3;
                    } else if (isPrev) {
                      transform = 'translateX(-100%) scale(0.8)';
                      opacity = 0.3;
                      zIndex = 2;
                    } else if (isNext) {
                      transform = 'translateX(100%) scale(0.8)';
                      opacity = 0.3;
                      zIndex = 2;
                    }
                    
                    return (
                      <div
                        key={index}
                        className={`absolute inset-0 transition-all duration-500 ease-in-out ${isTransitioning ? 'duration-300' : ''}`}
                        style={{
                          transform,
                          opacity,
                          zIndex
                        }}
                      >
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 h-full overflow-hidden">
                          <div className="p-8 h-full flex flex-col">
                            <div className="flex items-center mb-6">
                              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-3xl mr-6 shadow-lg animate-pulse">
                                {festival.icon}
                              </div>
                              <div>
                                <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                                  {festival.name}
                                </h3>
                                <div className="flex items-center text-gray-600 dark:text-gray-400">
                                  <MapPin className="w-5 h-5 mr-2" />
                                  <span className="text-lg">{festival.location}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-6 flex-1">
                              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800 overflow-y-auto">
                                <h4 className="flex items-center text-lg font-semibold text-blue-700 dark:text-blue-400 mb-4">
                                  <Wallet className="w-5 h-5 mr-2" />
                                  Budget-Friendly & Eco Ideas
                                </h4>
                                <ul className="space-y-3">
                                  {festival.budgetSuggestions.map((suggestion, i) => (
                                    <li key={i} className="flex items-start text-gray-700 dark:text-gray-300 text-sm">
                                      <span className="text-blue-500 mr-3 mt-1 text-lg">💰</span>
                                      <span className="leading-relaxed">{suggestion}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800 overflow-y-auto">
                                <h4 className="flex items-center text-lg font-semibold text-green-700 dark:text-green-400 mb-4">
                                  <Leaf className="w-5 h-5 mr-2" />
                                  Eco-Friendly Ideas
                                </h4>
                                <ul className="space-y-3">
                                  {festival.ecoSuggestions.map((suggestion, i) => (
                                    <li key={i} className="flex items-start text-gray-700 dark:text-gray-300 text-sm">
                                      <span className="text-green-500 mr-3 mt-1 text-lg">🌱</span>
                                      <span className="leading-relaxed">{suggestion}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Navigation Buttons */}
                <button
                  onClick={prevCard}
                  disabled={isTransitioning}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full p-3 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed z-10"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </button>
                
                <button
                  onClick={nextCard}
                  disabled={isTransitioning}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full p-3 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed z-10"
                >
                  <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </button>
                
                {/* Dots Indicator */}
                <div className="flex justify-center mt-8 space-x-2">
                  {filteredTraditionalFestivals.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToCard(index)}
                      disabled={isTransitioning}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentCardIndex
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 scale-125'
                          : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                      }`}
                    />
                  ))}
                </div>
                
                {/* Card Counter */}
                <div className="text-center mt-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {currentCardIndex + 1} of {filteredTraditionalFestivals.length}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal for festival details */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div 
            className="bg-white dark:bg-gray-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-700 animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-6 right-6 z-10 bg-white/90 dark:bg-gray-800/90 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full p-2 transition-colors shadow-lg"
              onClick={closeModal}
            >
              <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </button>
            
            {selectedFestival && (
              <>
                <div className="relative">
                  {selectedFestival.video && videoPlaying[selectedFestival.name] ? (
                    <video
                      className="w-full h-72 object-cover"
                      controls
                      autoPlay
                      onEnded={() => toggleVideo(selectedFestival.name)}
                    >
                      <source src={selectedFestival.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img 
                      src={selectedFestival.image} 
                      alt={selectedFestival.name} 
                      className="w-full h-72 object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                </div>
                
                <div className="p-8">
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                    {selectedFestival.name}
                  </h2>
                  <div className="flex items-center text-gray-600 dark:text-gray-400 mb-6">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span className="text-lg">{selectedFestival.location}</span>
                  </div>
                  
                  <div className="mb-8">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                      {selectedFestival.description}
                    </p>
                  </div>
                  
                  {selectedFestival.gallery && (
                    <div className="mb-8">
                      <h3 className="flex items-center text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">
                        <Palette className="w-6 h-6 mr-3" />
                        Gallery
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {selectedFestival.gallery.map((imageUrl: string, index: number) => (
                          <img
                            key={index}
                            src={imageUrl}
                            alt={`${selectedFestival.name} gallery ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mb-8">
                    <h3 className="flex items-center text-xl font-semibold text-green-700 dark:text-green-400 mb-4">
                      <Seedling className="w-6 h-6 mr-3" />
                      Sustainability Features
                    </h3>
                    <ul className="space-y-3">
                      {selectedFestival.features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                          <span className="text-green-500 mr-3 mt-1">✓</span>
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {selectedFestival.tags && (
                    <div className="flex flex-wrap gap-2">
                      {selectedFestival.tags.map((tag: string, index: number) => {
                        const tagInfo = getTagInfo(tag);
                        return (
                          <span key={index} className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${tagInfo.class}`}>
                            {tagInfo.icon}
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Dark Mode Toggle */}
      <button 
        className="fixed bottom-8 right-8 bg-gradient-to-r from-yellow-400 to-orange-400 dark:from-blue-500 dark:to-purple-500 hover:from-yellow-500 hover:to-orange-500 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-40"
        onClick={toggleDarkMode}
      >
        {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default EcoFestivals;