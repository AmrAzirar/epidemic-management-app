import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  FlatList,
  SafeAreaView,
  StatusBar,
  Image,
  Dimensions,
  Animated,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

// Palette de couleurs moderne
const colors = {
  primary: '#1E3A8A',      // Bleu royal (principal)
  secondary: '#10B981',     // Vert émeraude
  accent: '#6366F1',        // Indigo vif
  error: '#EF4444',         // Rouge moderne
  warning: '#F59E0B',       // Orange doré
  info: '#3B82F6',          // Bleu vif
  success: '#10B981',       // Vert success
  
  // Couleurs de surface
  surface: '#FFFFFF',       // Blanc
  background: '#F8FAFC',    // Gris très clair
  card: '#FFFFFF',          // Blanc pour les cartes
  
  // Couleurs de texte
  textPrimary: '#1F2937',   // Gris très foncé
  textSecondary: '#6B7280', // Gris moyen
  textLight: '#9CA3AF',     // Gris clair
  textInverse: '#FFFFFF',   // Blanc
  
  // Couleurs spéciales
  ministry: '#059669',      // Vert ministère
  ministryLight: '#D1FAE5', // Vert ministère clair
  gradient1: '#1E3A8A',     // Début gradient
  gradient2: '#3B82F6',     // Fin gradient
};

// =====================================
// COMPTES DE DÉMONSTRATION - USAGE INTERNE UNIQUEMENT
// Ces identifiants sont conservés pour les tests et simulations
// mais ne sont plus affichés dans l'interface utilisateur
// =====================================
const DEMO_ACCOUNTS = {
  doctors: [
    { 
      email: 'docteur@hopital.fr', 
      password: 'doctor123', 
      name: 'Dr. Martin Dubois',
      description: 'Médecin chef - Hôpital Central'
    },
    { 
      email: 'medecin@clinique.fr', 
      password: 'medecin123', 
      name: 'Dr. Sophie Laurent',
      description: 'Spécialiste infectiologue - Clinique des Roses'
    }
  ],
  citizens: [
    { 
      email: 'citoyen@email.fr', 
      password: 'citoyen123', 
      name: 'Jean Dupont',
      description: 'Citoyen - Casablanca Centre'
    },
    { 
      email: 'utilisateur@gmail.com', 
      password: 'user123', 
      name: 'Marie Martin',
      description: 'Citoyenne - Rabat Nord'
    }
  ]
};

// Fonction utilitaire pour les développeurs/testeurs
// Pour afficher les comptes disponibles dans la console (dev uniquement)
const logDemoAccounts = () => {
  if (__DEV__) {
    console.log('=== COMPTES DE DÉMONSTRATION DISPONIBLES ===');
    console.log('DOCTEURS:');
    DEMO_ACCOUNTS.doctors.forEach(account => {
      console.log(`- ${account.email} / ${account.password} (${account.name})`);
    });
    console.log('CITOYENS:');
    DEMO_ACCOUNTS.citizens.forEach(account => {
      console.log(`- ${account.email} / ${account.password} (${account.name})`);
    });
    console.log('=============================================');
  }
};

// Composant d'icône personnalisée
const CustomIcon = ({ type, size = 20, color = colors.textPrimary, style = {} }) => {
  const getIconComponent = () => {
    switch (type) {
      case 'doctor':
        return (
          <View style={[styles.iconWrapper, { backgroundColor: color }, style]}>
            <View style={styles.stethoscope}>
              <View style={styles.stethoscopeHead} />
              <View style={styles.stethoscopeTube} />
            </View>
          </View>
        );
      case 'citizen':
        return (
          <View style={[styles.iconWrapper, { backgroundColor: color }, style]}>
            <View style={styles.personIcon}>
              <View style={styles.personHead} />
              <View style={styles.personBody} />
            </View>
          </View>
        );
      case 'dashboard':
        return (
          <View style={[styles.iconWrapper, { backgroundColor: color }, style]}>
            <View style={styles.dashboardGrid}>
              <View style={styles.gridItem} />
              <View style={styles.gridItem} />
              <View style={styles.gridItem} />
              <View style={styles.gridItem} />
            </View>
          </View>
        );
      case 'cases':
        return (
          <View style={[styles.iconWrapper, { backgroundColor: color }, style]}>
            <View style={styles.documentIcon}>
              <View style={styles.documentLine} />
              <View style={styles.documentLine} />
              <View style={styles.documentLine} />
            </View>
          </View>
        );
      case 'contacts':
        return (
          <View style={[styles.iconWrapper, { backgroundColor: color }, style]}>
            <View style={styles.contactsIcon}>
              <View style={styles.contactPerson} />
              <View style={[styles.contactPerson, { marginLeft: 6 }]} />
            </View>
          </View>
        );
      case 'map':
        return (
          <View style={[styles.iconWrapper, { backgroundColor: color }, style]}>
            <View style={styles.mapIcon}>
              <View style={styles.mapPin} />
              <View style={styles.mapBase} />
            </View>
          </View>
        );
      case 'alert':
        return (
          <View style={[styles.iconWrapper, { backgroundColor: color }, style]}>
            <View style={styles.alertTriangle}>
              <Text style={styles.alertExclamation}>!</Text>
            </View>
          </View>
        );
      case 'add':
        return (
          <View style={[styles.iconWrapper, { backgroundColor: color }, style]}>
            <View style={styles.plusIcon}>
              <View style={styles.plusHorizontal} />
              <View style={styles.plusVertical} />
            </View>
          </View>
        );
      case 'home':
        return (
          <View style={[styles.iconWrapper, { backgroundColor: color }, style]}>
            <View style={styles.houseIcon}>
              <View style={styles.houseRoof} />
              <View style={styles.houseBase} />
            </View>
          </View>
        );
      case 'emergency':
        return (
          <View style={[styles.iconWrapper, { backgroundColor: color }, style]}>
            <View style={styles.emergencyIcon}>
              <View style={styles.emergencyCross} />
            </View>
          </View>
        );
      case 'info':
        return (
          <View style={[styles.iconWrapper, { backgroundColor: color }, style]}>
            <View style={styles.infoIcon}>
              <Text style={styles.infoText}>i</Text>
            </View>
          </View>
        );
      default:
        return (
          <View style={[styles.iconWrapper, { backgroundColor: color }, style]}>
            <View style={styles.defaultIcon} />
          </View>
        );
    }
  };

  return getIconComponent();
};

// Composant du logo du ministère
const MinistryLogo = React.memo(({ size = 80, style = {} }) => (
  <View style={[styles.logoContainer, style]}>
    <View style={[styles.logoFrame, { width: size, height: size }]}>
      <View style={styles.logoInner}>
        <View style={styles.crescentShape} />
        <View style={styles.waveShape} />
      </View>
    </View>
    <Text style={styles.ministryText}>وزارة الصحة والحماية الاجتماعية</Text>
    <Text style={styles.ministryTextFr}>Ministère de la Santé et de la Protection Sociale</Text>
  </View>
));

// Composant Dropdown pour les symptômes
const SymptomsDropdown = React.memo(({ selectedSymptoms = [], onSymptomsChange, style = {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  // Liste complète des symptômes médicaux
  const allSymptoms = [
    // Symptômes généraux
    'Fièvre', 'Fatigue', 'Frissons', 'Sueurs nocturnes', 'Perte d\'appétit',
    'Perte de poids', 'Gain de poids', 'Malaise général', 'Faiblesse',
    
    // Symptômes respiratoires
    'Toux sèche', 'Toux grasse', 'Essoufflement', 'Difficulté respiratoire',
    'Douleur thoracique', 'Sifflements respiratoires', 'Congestion nasale',
    'Écoulement nasal', 'Éternuements', 'Mal de gorge', 'Enrouement',
    
    // Symptômes digestifs
    'Nausées', 'Vomissements', 'Diarrhée', 'Constipation', 'Douleurs abdominales',
    'Ballonnements', 'Brûlures d\'estomac', 'Perte du goût', 'Perte de l\'odorat',
    
    // Symptômes neurologiques
    'Maux de tête', 'Vertiges', 'Confusion', 'Perte de mémoire',
    'Difficultés de concentration', 'Troubles du sommeil', 'Anxiété',
    'Dépression', 'Irritabilité',
    
    // Symptômes cutanés
    'Éruption cutanée', 'Démangeaisons', 'Urticaire', 'Rougeurs',
    'Sécheresse cutanée', 'Changement de couleur de peau',
    
    // Symptômes musculo-squelettiques
    'Douleurs musculaires', 'Douleurs articulaires', 'Raideur articulaire',
    'Gonflement des articulations', 'Crampes musculaires',
    
    // Autres symptômes spécifiques
    'Palpitations', 'Hypertension', 'Hypotension', 'Gonflement des membres',
    'Troubles de la vision', 'Troubles de l\'audition', 'Acouphènes',
    'Saignements inhabituels', 'Ecchymoses faciles'
  ].sort();

  // Filtrer les symptômes selon la recherche
  const filteredSymptoms = allSymptoms.filter(symptom =>
    symptom.toLowerCase().includes(searchText.toLowerCase())
  );

  // Gérer la sélection/désélection d'un symptôme
  const toggleSymptom = (symptom) => {
    const isSelected = selectedSymptoms.includes(symptom);
    let newSymptoms;
    
    if (isSelected) {
      newSymptoms = selectedSymptoms.filter(s => s !== symptom);
    } else {
      newSymptoms = [...selectedSymptoms, symptom];
    }
    
    onSymptomsChange(newSymptoms);
  };

  // Supprimer un symptôme sélectionné
  const removeSymptom = (symptom) => {
    const newSymptoms = selectedSymptoms.filter(s => s !== symptom);
    onSymptomsChange(newSymptoms);
  };

  return (
    <View style={[styles.dropdownContainer, style]}>
      {/* Affichage des symptômes sélectionnés */}
      {selectedSymptoms.length > 0 && (
        <View style={styles.selectedSymptomsContainer}>
          <Text style={styles.selectedSymptomsLabel}>Symptômes sélectionnés:</Text>
          <View style={styles.selectedSymptomsList}>
            {selectedSymptoms.map((symptom, index) => (
              <View key={index} style={styles.selectedSymptomChip}>
                <Text style={styles.selectedSymptomText}>{symptom}</Text>
                <TouchableOpacity 
                  onPress={() => removeSymptom(symptom)}
                  style={styles.removeSymptomButton}
                  hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
                >
                  <Text style={styles.removeSymptomText}>×</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Bouton pour ouvrir/fermer la dropdown */}
      <TouchableOpacity
        style={[styles.dropdownButton, isOpen && styles.dropdownButtonOpen]}
        onPress={() => setIsOpen(!isOpen)}
        activeOpacity={0.7}
      >
        <Text style={styles.dropdownButtonText}>
          {selectedSymptoms.length > 0 
            ? `${selectedSymptoms.length} symptôme(s) sélectionné(s)` 
            : 'Sélectionner des symptômes'
          }
        </Text>
        <Text style={[styles.dropdownArrow, isOpen && styles.dropdownArrowOpen]}>
          ▼
        </Text>
      </TouchableOpacity>

      {/* Menu dropdown */}
      {isOpen && (
        <View style={styles.dropdownMenu}>
          {/* Barre de recherche */}
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un symptôme..."
            placeholderTextColor={colors.textSecondary}
            value={searchText}
            onChangeText={setSearchText}
            autoCorrect={false}
            autoCapitalize="none"
          />

          {/* Liste des symptômes */}
          <ScrollView 
            style={styles.symptomsScrollView}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {filteredSymptoms.map((symptom, index) => {
              const isSelected = selectedSymptoms.includes(symptom);
              
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.symptomItem,
                    isSelected && styles.symptomItemSelected
                  ]}
                  onPress={() => toggleSymptom(symptom)}
                  activeOpacity={0.7}
                >
                  <View style={[
                    styles.symptomCheckbox,
                    isSelected && styles.symptomCheckboxSelected
                  ]}>
                    {isSelected && (
                      <Text style={styles.symptomCheckmark}>✓</Text>
                    )}
                  </View>
                  <Text style={[
                    styles.symptomText,
                    isSelected && styles.symptomTextSelected
                  ]}>
                    {symptom}
                  </Text>
                </TouchableOpacity>
              );
            })}
            
            {filteredSymptoms.length === 0 && (
              <Text style={styles.noResultsText}>
                Aucun symptôme trouvé pour "{searchText}"
              </Text>
            )}
          </ScrollView>

          {/* Actions rapides */}
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={() => onSymptomsChange([])}
            >
              <Text style={styles.quickActionText}>Tout effacer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.quickActionButton, styles.closeButton]}
              onPress={() => setIsOpen(false)}
            >
              <Text style={[styles.quickActionText, styles.closeButtonText]}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
});

// Page de sélection de rôle - DÉPLACÉE EN DEHORS
const RoleSelectionScreen = React.memo(({ onSelectRole }) => (
  <SafeAreaView style={styles.authContainer}>
    <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
    <ScrollView contentContainerStyle={styles.authContent}>
      <View style={styles.headerSection}>
        <MinistryLogo size={100} />
        <View style={styles.appTitleContainer}>
          <Text style={styles.appTitle}>نظام مراقبة الأوبئة</Text>
          <Text style={styles.appTitleFr}>Système de Surveillance Épidémiologique</Text>
          <Text style={styles.appSubtitle}>Plateforme numérique de gestion des épidémies</Text>
        </View>
      </View>

      <View style={styles.roleContainer}>
        <Text style={styles.roleTitle}>اختر ملفك الشخصي | Sélectionnez votre profil</Text>
        
        <TouchableOpacity 
          style={[styles.roleCard, styles.doctorCard]}
          onPress={() => onSelectRole('doctorLogin')}
        >
          <View style={styles.roleIconContainer}>
            <CustomIcon type="doctor" size={60} color={colors.accent} />
          </View>
          <Text style={styles.roleCardTitle}>Docteur / Médecin</Text>
          <Text style={styles.roleCardTitleAr}>طبيب / أخصائي</Text>
          <Text style={styles.roleCardDesc}>
            Accès complet aux données médicales et gestion des cas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.roleCard, styles.citizenCard]}
          onPress={() => onSelectRole('citizenLogin')}
        >
          <View style={styles.roleIconContainer}>
            <CustomIcon type="citizen" size={60} color={colors.secondary} />
          </View>
          <Text style={styles.roleCardTitle}>Citoyen</Text>
          <Text style={styles.roleCardTitleAr}>مواطن</Text>
          <Text style={styles.roleCardDesc}>
            Signalement de symptômes et suivi personnel de santé
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  </SafeAreaView>
));

// Page de connexion docteur - INTERFACE SIMPLIFIÉE (sans affichage des comptes démo)
const DoctorLoginScreen = React.memo(({ onBack, onLogin, loginData, setLoginData }) => (
  <SafeAreaView style={styles.authContainer}>
    <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
    <ScrollView contentContainerStyle={styles.authContent}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={onBack}
      >
        <Text style={styles.backButtonText}>← Retour</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <View style={styles.loginHeader}>
          <View style={styles.loginIconContainer}>
            <CustomIcon type="doctor" size={60} color={colors.accent} />
          </View>
          <Text style={styles.loginTitle}>Connexion Professionnelle</Text>
          <Text style={styles.loginTitleAr}>دخول المهنيين</Text>
          <Text style={styles.loginSubtitle}>Accédez à votre espace médical sécurisé</Text>
        </View>

        <View style={styles.loginForm}>
          <TextInput
            style={styles.loginInput}
            placeholder="Email professionnel"
            placeholderTextColor={colors.textSecondary}
            value={loginData.email}
            onChangeText={(text) => setLoginData(prev => ({...prev, email: text}))}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="emailAddress"
          />
          
          <TextInput
            style={styles.loginInput}
            placeholder="Mot de passe"
            placeholderTextColor={colors.textSecondary}
            value={loginData.password}
            onChangeText={(text) => setLoginData(prev => ({...prev, password: text}))}
            secureTextEntry
            autoCorrect={false}
            textContentType="password"
          />

          <TouchableOpacity 
            style={[styles.loginButton, styles.doctorButton]}
            onPress={() => onLogin('doctor')}
          >
            <Text style={styles.loginButtonText}>Se connecter</Text>
          </TouchableOpacity>

          {/* 
          REMARQUE POUR LES DÉVELOPPEURS :
          L'encadré avec les comptes de démonstration a été supprimé de l'interface.
          Les identifiants sont toujours disponibles dans la constante DEMO_ACCOUNTS
          en haut du fichier pour les tests internes.
          */}
        </View>
      </View>
    </ScrollView>
  </SafeAreaView>
));

// Page de connexion citoyen - INTERFACE SIMPLIFIÉE (sans affichage des comptes démo)
const CitizenLoginScreen = React.memo(({ onBack, onLogin, loginData, setLoginData }) => (
  <SafeAreaView style={styles.authContainer}>
    <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
    <ScrollView contentContainerStyle={styles.authContent}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={onBack}
      >
        <Text style={styles.backButtonText}>← Retour</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <View style={styles.loginHeader}>
          <View style={styles.loginIconContainer}>
            <CustomIcon type="citizen" size={60} color={colors.secondary} />
          </View>
          <Text style={styles.loginTitle}>Connexion Citoyen</Text>
          <Text style={styles.loginTitleAr}>دخول المواطن</Text>
          <Text style={styles.loginSubtitle}>Accédez à votre espace personnel de santé</Text>
        </View>

        <View style={styles.loginForm}>
          <TextInput
            style={styles.loginInput}
            placeholder="Adresse email"
            placeholderTextColor={colors.textSecondary}
            value={loginData.email}
            onChangeText={(text) => setLoginData(prev => ({...prev, email: text}))}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="emailAddress"
          />
          
          <TextInput
            style={styles.loginInput}
            placeholder="Mot de passe"
            placeholderTextColor={colors.textSecondary}
            value={loginData.password}
            onChangeText={(text) => setLoginData(prev => ({...prev, password: text}))}
            secureTextEntry
            autoCorrect={false}
            textContentType="password"
          />

          <TouchableOpacity 
            style={[styles.loginButton, styles.citizenButton]}
            onPress={() => onLogin('citizen')}
          >
            <Text style={styles.loginButtonText}>Se connecter</Text>
          </TouchableOpacity>

          {/* 
          REMARQUE POUR LES DÉVELOPPEURS :
          L'encadré avec les comptes de démonstration a été supprimé de l'interface.
          Les identifiants sont toujours disponibles dans la constante DEMO_ACCOUNTS
          en haut du fichier pour les tests internes.
          */}
        </View>
      </View>
    </ScrollView>
  </SafeAreaView>
));

// Composant principal de l'application
const EpidemicManagementApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'doctor' ou 'citizen'
  const [currentScreen, setCurrentScreen] = useState('roleSelection'); // 'roleSelection', 'doctorLogin', 'citizenLogin'
  const [activeTab, setActiveTab] = useState('dashboard');
  const [cases, setCases] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [formData, setFormData] = useState({});
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  // Afficher les comptes de démonstration dans la console (dev uniquement)
  useEffect(() => {
    logDemoAccounts();
  }, []);

  // Données initiales pour la démonstration
  useEffect(() => {
    if (isAuthenticated) {
      initializeData();
    }
  }, [isAuthenticated]);

  const initializeData = () => {
    setCases([
      {
        id: '1',
        name: 'Jean Dupont',
        age: 35,
        status: 'confirmed',
        symptoms: ['Fièvre', 'Toux sèche'],
        date: '2024-01-15',
        zone: 'Centre-ville'
      },
      {
        id: '2',
        name: 'Marie Martin',
        age: 28,
        status: 'suspected',
        symptoms: ['Fièvre', 'Fatigue'],
        date: '2024-01-16',
        zone: 'Banlieue Nord'
      }
    ]);

    setContacts([
      {
        id: '1',
        caseId: '1',
        name: 'Pierre Dubois',
        phone: '06 12 34 56 78',
        lastContact: '2024-01-14',
        riskLevel: 'high'
      }
    ]);

    setAlerts([
      {
        id: '1',
        type: 'warning',
        message: 'Augmentation des cas dans la zone Centre-ville',
        date: '2024-01-16'
      }
    ]);
  };

  // FONCTIONS OPTIMISÉES AVEC useCallback
  const handleScreenChange = useCallback((screen) => {
    setCurrentScreen(screen);
  }, []);

  const handleBackToRole = useCallback(() => {
    setCurrentScreen('roleSelection');
  }, []);

  const handleLogin = useCallback((role) => {
    // Utilisation de la constante DEMO_ACCOUNTS pour la validation
    const users = role === 'doctor' ? DEMO_ACCOUNTS.doctors : DEMO_ACCOUNTS.citizens;
    const user = users.find(u => u.email === loginData.email && u.password === loginData.password);
    
    if (user) {
      setUserRole(role);
      setIsAuthenticated(true);
      setLoginData({ email: '', password: '' });
      Alert.alert('Connexion réussie', `Bienvenue ${user.name} !`);
    } else {
      Alert.alert('Erreur de connexion', 'Email ou mot de passe incorrect');
    }
  }, [loginData.email, loginData.password]);

  const updateLoginData = useCallback((updater) => {
    setLoginData(updater);
  }, []);

  const updateFormData = useCallback((updater) => {
    setFormData(updater);
  }, []);

  // Fonction de déconnexion
  const handleLogout = useCallback(() => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Déconnexion', 
          onPress: () => {
            setIsAuthenticated(false);
            setUserRole(null);
            setCurrentScreen('roleSelection');
            setActiveTab('dashboard');
          }
        }
      ]
    );
  }, []);

  // Composant Dashboard (adapté selon le rôle)
  const Dashboard = useCallback(() => {
    const totalCases = cases.length;
    const confirmedCases = cases.filter(c => c.status === 'confirmed').length;
    const suspectedCases = cases.filter(c => c.status === 'suspected').length;
    const totalContacts = contacts.length;

    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.dashboardHeader}>
          <View style={styles.headerLeft}>
            <MinistryLogo size={50} style={styles.miniLogo} />
            <View style={styles.headerInfo}>
              <Text style={styles.title}>
                {userRole === 'doctor' ? 'Tableau de Bord Médical' : 'Mon Suivi Santé'}
              </Text>
              <Text style={styles.welcomeText}>
                {userRole === 'doctor' ? 'Espace Professionnel' : 'Espace Citoyen'}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Déconnexion</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.statsContainer}>
          <StatCard title="Total Cas" value={totalCases} color={colors.accent} label="STATS" />
          <StatCard title="Confirmés" value={confirmedCases} color={colors.error} label="ALERT" />
          <StatCard title="Suspectés" value={suspectedCases} color={colors.warning} label="SUSP" />
          {userRole === 'doctor' && (
            <StatCard title="Contacts" value={totalContacts} color={colors.info} label="CONT" />
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <CustomIcon type="alert" size={24} color={colors.warning} />
            <Text style={styles.sectionTitle}>ALERTES RÉCENTES</Text>
          </View>
          {alerts.map(alert => (
            <View key={alert.id} style={styles.alertCard}>
              <View style={styles.alertHeader}>
                <View style={styles.alertIndicator} />
                <Text style={styles.alertText}>{alert.message}</Text>
              </View>
              <Text style={styles.alertDate}>{alert.date}</Text>
            </View>
          ))}
        </View>

        {userRole === 'doctor' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <CustomIcon type="add" size={24} color={colors.accent} />
              <Text style={styles.sectionTitle}>ACTIONS RAPIDES</Text>
            </View>
            <View style={styles.actionGrid}>
              <TouchableOpacity 
                style={[styles.actionButton, styles.primaryAction]}
                onPress={() => openModal('case')}
              >
                <CustomIcon type="cases" size={32} color="transparent" />
                <Text style={styles.actionButtonText}>Nouveau Cas</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.actionButton, styles.secondaryAction]}
                onPress={() => openModal('contact')}
              >
                <CustomIcon type="contacts" size={32} color="transparent" />
                <Text style={styles.actionButtonText}>Nouveau Contact</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {userRole === 'citizen' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <CustomIcon type="home" size={24} color={colors.secondary} />
              <Text style={styles.sectionTitle}>SERVICES CITOYENS</Text>
            </View>
            <TouchableOpacity 
              style={[styles.actionButton, styles.emergencyAction]}
              onPress={() => Alert.alert('Signalement', 'Fonctionnalité de signalement de symptômes')}
            >
              <CustomIcon type="emergency" size={32} color="transparent" />
              <Text style={styles.actionButtonText}>Signaler des symptômes</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, styles.infoAction]}
              onPress={() => Alert.alert('Conseils', 'Conseils de prévention et recommandations')}
            >
              <CustomIcon type="info" size={32} color="transparent" />
              <Text style={styles.actionButtonText}>Conseils de prévention</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    );
  }, [cases, contacts, alerts, userRole, handleLogout]);

  // Composant de statistiques
  const StatCard = React.memo(({ title, value, color, label }) => (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <View style={styles.statHeader}>
        <View style={[styles.statIndicator, { backgroundColor: color }]}>
          <Text style={styles.statLabel}>{label}</Text>
        </View>
        <Text style={[styles.statValue, { color: color }]}>{value}</Text>
      </View>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  ));

  // Composant de gestion des cas (seulement pour les docteurs)
  const CasesManagement = useCallback(() => {
    if (userRole !== 'doctor') {
      return (
        <View style={styles.restrictedContainer}>
          <CustomIcon type="alert" size={48} color={colors.error} />
          <Text style={styles.restrictedText}>
            Accès restreint aux professionnels de santé
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerWithIcon}>
            <CustomIcon type="cases" size={28} color={colors.accent} />
            <Text style={styles.title}>GESTION DES CAS</Text>
          </View>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => openModal('case')}
          >
            <CustomIcon type="add" size={16} color="transparent" />
            <Text style={styles.addButtonText}>Ajouter</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={cases}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.caseCard}>
              <View style={styles.caseHeader}>
                <View style={styles.caseNameContainer}>
                  <CustomIcon type="citizen" size={24} color={colors.info} />
                  <Text style={styles.caseName}>{item.name}</Text>
                </View>
                <View style={[styles.statusBadge, 
                  { backgroundColor: item.status === 'confirmed' ? colors.error : colors.warning }
                ]}>
                  <Text style={styles.statusText}>
                    {item.status === 'confirmed' ? 'Confirmé' : 'Suspecté'}
                  </Text>
                </View>
              </View>
              <View style={styles.caseDetails}>
                <Text style={styles.caseInfo}>Âge: {item.age} ans</Text>
                <Text style={styles.caseInfo}>Zone: {item.zone}</Text>
                <Text style={styles.caseInfo}>Date: {item.date}</Text>
                <Text style={styles.caseInfo}>Symptômes: {Array.isArray(item.symptoms) ? item.symptoms.join(', ') : item.symptoms}</Text>
              </View>
            </View>
          )}
        />
      </View>
    );
  }, [userRole, cases]);

  // Composant de traçage des contacts (seulement pour les docteurs)
  const ContactTracing = useCallback(() => {
    if (userRole !== 'doctor') {
      return (
        <View style={styles.restrictedContainer}>
          <CustomIcon type="alert" size={48} color={colors.error} />
          <Text style={styles.restrictedText}>
            Accès restreint aux professionnels de santé
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerWithIcon}>
            <CustomIcon type="contacts" size={28} color={colors.secondary} />
            <Text style={styles.title}>TRAÇAGE DES CONTACTS</Text>
          </View>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => openModal('contact')}
          >
            <CustomIcon type="add" size={16} color="transparent" />
            <Text style={styles.addButtonText}>Ajouter</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={contacts}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.contactCard}>
              <View style={styles.contactHeader}>
                <CustomIcon type="citizen" size={24} color={colors.secondary} />
                <Text style={styles.contactName}>{item.name}</Text>
              </View>
              <View style={styles.contactDetails}>
                <Text style={styles.contactInfo}>Téléphone: {item.phone}</Text>
                <Text style={styles.contactInfo}>Dernier contact: {item.lastContact}</Text>
              </View>
              <View style={[styles.riskBadge, 
                { backgroundColor: getRiskColor(item.riskLevel) }
              ]}>
                <Text style={styles.riskText}>
                  Risque {item.riskLevel === 'high' ? 'Élevé' : 'Faible'}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    );
  }, [userRole, contacts]);

  // Composant de cartographie avec Heatmap
  const Mapping = useCallback(() => {
    const [selectedZone, setSelectedZone] = useState(null);
    const [viewMode, setViewMode] = useState('heatmap'); // 'heatmap' ou 'traditional'

    // Données simulées pour la heatmap avec calculs basés sur les cas réels
    const heatmapData = [
      { id: 1, name: 'Centre-ville', x: '35%', y: '40%', width: 80, height: 60, cases: 2, population: 150000, intensity: 0.8 },
      { id: 2, name: 'Banlieue Nord', x: '30%', y: '15%', width: 70, height: 50, cases: 1, population: 80000, intensity: 0.6 },
      { id: 3, name: 'Zone Ouest', x: '10%', y: '50%', width: 65, height: 55, cases: 1, population: 95000, intensity: 0.5 },
      { id: 4, name: 'Zone Sud', x: '45%', y: '70%', width: 75, height: 45, cases: 0, population: 60000, intensity: 0 },
      { id: 5, name: 'Zone Est', x: '70%', y: '45%', width: 70, height: 50, cases: 0, population: 70000, intensity: 0 },
      { id: 6, name: 'Périphérie Nord', x: '40%', y: '5%', width: 60, height: 40, cases: 0, population: 45000, intensity: 0 },
      { id: 7, name: 'Quartier Industriel', x: '75%', y: '15%', width: 55, height: 40, cases: 1, population: 35000, intensity: 0.7 },
      { id: 8, name: 'Résidentiel Sud', x: '20%', y: '75%', width: 65, height: 35, cases: 0, population: 55000, intensity: 0 },
    ];

    const handleZonePress = (zone) => {
      setSelectedZone(zone);
    };

    const calculateRiskLevel = (intensity) => {
      if (intensity === 0) return 'Aucun risque';
      if (intensity <= 0.3) return 'Risque faible';
      if (intensity <= 0.6) return 'Risque modéré';
      if (intensity <= 0.8) return 'Risque élevé';
      return 'Risque critique';
    };

    const getRiskColorMap = (intensity) => {
      if (intensity === 0) return colors.success;
      if (intensity <= 0.3) return colors.info;
      if (intensity <= 0.6) return colors.warning;
      if (intensity <= 0.8) return colors.error;
      return '#DC2626';
    };

    const getIntensityColor = (intensity) => {
      if (intensity === 0) return '#10B981';
      if (intensity <= 0.2) return '#84CC16';
      if (intensity <= 0.4) return '#EAB308';
      if (intensity <= 0.6) return '#F97316';
      if (intensity <= 0.8) return '#EF4444';
      return '#DC2626';
    };

    const getOpacity = (intensity) => {
      return Math.max(0.3, intensity);
    };

    // Composant Heatmap intégré
    const HeatmapGrid = ({ data, width, height }) => {
      const [animatedValues] = useState(() => 
        data.map(() => new Animated.Value(0))
      );

      useEffect(() => {
        const animations = animatedValues.map((animatedValue, index) => 
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 500 + index * 100,
            useNativeDriver: true,
          })
        );

        Animated.stagger(50, animations).start();
      }, []);

      return (
        <View style={[styles.heatmapContainer, { width, height }]}>
          {data.map((zone, index) => {
            const animatedStyle = {
              transform: [{
                scale: animatedValues[index].interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1],
                }),
              }],
              opacity: animatedValues[index],
            };

            return (
              <Animated.View
                key={zone.id}
                style={[
                  styles.heatmapZone,
                  {
                    left: zone.x,
                    top: zone.y,
                    width: zone.width,
                    height: zone.height,
                    backgroundColor: getIntensityColor(zone.intensity),
                    opacity: getOpacity(zone.intensity),
                  },
                  animatedStyle,
                ]}
              >
                <TouchableOpacity
                  style={styles.zoneTouch}
                  onPress={() => handleZonePress(zone)}
                  activeOpacity={0.7}
                >
                  <View style={styles.zoneContent}>
                    <Text style={styles.zoneCases}>{zone.cases}</Text>
                    <Text style={styles.zoneNameSmall}>{zone.name}</Text>
                  </View>
                  
                  {zone.intensity > 0.6 && (
                    <View style={[styles.pulseRing, { borderColor: getIntensityColor(zone.intensity) }]} />
                  )}
                </TouchableOpacity>
              </Animated.View>
            );
          })}
          
          <View style={styles.gridOverlay}>
            {Array.from({ length: 10 }, (_, i) => (
              <View key={`h-${i}`} style={[styles.gridLine, styles.horizontalLine, { top: (i * height) / 10 }]} />
            ))}
            {Array.from({ length: 10 }, (_, i) => (
              <View key={`v-${i}`} style={[styles.gridLine, styles.verticalLine, { left: (i * width) / 10 }]} />
            ))}
          </View>
        </View>
      );
    };

    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.headerWithIcon}>
          <CustomIcon type="map" size={28} color={colors.info} />
          <Text style={styles.title}>CARTOGRAPHIE ÉPIDÉMIOLOGIQUE</Text>
        </View>
        
        {/* Contrôles de vue */}
        <View style={styles.viewControls}>
          <TouchableOpacity 
            style={[styles.viewButton, viewMode === 'heatmap' && styles.activeViewButton]}
            onPress={() => setViewMode('heatmap')}
          >
            <Text style={[styles.viewButtonText, viewMode === 'heatmap' && styles.activeViewButtonText]}>
              Heatmap
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.viewButton, viewMode === 'traditional' && styles.activeViewButton]}
            onPress={() => setViewMode('traditional')}
          >
            <Text style={[styles.viewButtonText, viewMode === 'traditional' && styles.activeViewButtonText]}>
              Vue classique
            </Text>
          </TouchableOpacity>
        </View>

        {/* Légende améliorée */}
        <View style={styles.legendContainer}>
          <Text style={styles.legendTitle}>Intensité des cas (pour 10k habitants)</Text>
          <View style={styles.legendGrid}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
              <Text style={styles.legendText}>0 cas</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#EAB308' }]} />
              <Text style={styles.legendText}>Modéré</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
              <Text style={styles.legendText}>Élevé</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#DC2626' }]} />
              <Text style={styles.legendText}>Critique</Text>
            </View>
          </View>
        </View>
        
        {/* Carte principale */}
        <View style={styles.mapContainer}>
          <View style={styles.mapHeader}>
            <Text style={styles.mapTitle}>Région Casablanca-Settat</Text>
            <Text style={styles.mapSubtitle}>
              {viewMode === 'heatmap' ? 'Vue thermique des cas' : 'Vue traditionnelle'}
            </Text>
          </View>
          
          <View style={styles.mapWrapper}>
            {viewMode === 'heatmap' ? (
              <HeatmapGrid 
                data={heatmapData}
                width={screenWidth - 64}
                height={280}
              />
            ) : (
              <View style={styles.staticMap}>
                {heatmapData.slice(0, 5).map((zone, index) => (
                  <View key={zone.id} style={[styles.mapZone, { left: zone.x, top: zone.y }]}>
                    <View style={[styles.zoneMarker, { backgroundColor: getRiskColorMap(zone.intensity) }]}>
                      <Text style={styles.markerText}>{zone.cases}</Text>
                    </View>
                    <Text style={styles.zoneLabel}>{zone.name}</Text>
                  </View>
                ))}
              </View>
            )}
            
            <View style={styles.mapControls}>
              <TouchableOpacity style={styles.mapButton}>
                <Text style={styles.mapButtonText}>ZOOM +</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.mapButton}>
                <Text style={styles.mapButtonText}>ZOOM -</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.mapButton}>
                <Text style={styles.mapButtonText}>CENTRER</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Panneau d'information de la zone sélectionnée */}
        {selectedZone && (
          <View style={styles.zoneInfoPanel}>
            <View style={styles.zoneInfoHeader}>
              <View style={styles.zoneInfoTitle}>
                <View style={[styles.zoneIndicator, { backgroundColor: getRiskColorMap(selectedZone.intensity) }]} />
                <Text style={styles.zoneInfoName}>{selectedZone.name}</Text>
              </View>
              <TouchableOpacity onPress={() => setSelectedZone(null)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.zoneStats}>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Cas actifs:</Text>
                <Text style={[styles.statValue, { color: colors.error }]}>{selectedZone.cases}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Population:</Text>
                <Text style={styles.statValue}>{selectedZone.population.toLocaleString()}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Taux d'incidence:</Text>
                <Text style={styles.statValue}>
                  {((selectedZone.cases / selectedZone.population) * 10000).toFixed(2)}/10k
                </Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Niveau de risque:</Text>
                <Text style={[styles.statValue, { color: getRiskColorMap(selectedZone.intensity) }]}>
                  {calculateRiskLevel(selectedZone.intensity)}
                </Text>
              </View>
            </View>
          </View>
        )}
        
        {/* Statistiques globales */}
        <View style={styles.globalStats}>
          <View style={styles.statsHeader}>
            <CustomIcon type="dashboard" size={24} color={colors.accent} />
            <Text style={styles.statsTitle}>ANALYSE GLOBALE</Text>
          </View>
          
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statCardNumber}>{heatmapData.reduce((sum, zone) => sum + zone.cases, 0)}</Text>
              <Text style={styles.statCardLabel}>Cas totaux</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statCardNumber}>{heatmapData.filter(zone => zone.intensity > 0.6).length}</Text>
              <Text style={styles.statCardLabel}>Zones à risque</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statCardNumber}>
                {(heatmapData.reduce((sum, zone) => sum + zone.population, 0) / 1000).toFixed(0)}k
              </Text>
              <Text style={styles.statCardLabel}>Population</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statCardNumber}>
                {((heatmapData.reduce((sum, zone) => sum + zone.cases, 0) / 
                   heatmapData.reduce((sum, zone) => sum + zone.population, 0)) * 10000).toFixed(1)}
              </Text>
              <Text style={styles.statCardLabel}>Taux/10k</Text>
            </View>
          </View>
        </View>

        {/* Liste détaillée des zones */}
        <View style={styles.zonesList}>
          <View style={styles.zonesHeader}>
            <CustomIcon type="cases" size={24} color={colors.secondary} />
            <Text style={styles.zonesTitle}>DÉTAIL PAR ZONE</Text>
          </View>
          
          {heatmapData
            .sort((a, b) => b.intensity - a.intensity)
            .map((zone) => (
            <TouchableOpacity 
              key={zone.id} 
              style={styles.zoneListItem}
              onPress={() => handleZonePress(zone)}
            >
              <View style={styles.zoneInfo}>
                <View style={[styles.zoneIcon, { backgroundColor: getRiskColorMap(zone.intensity) }]} />
                <View style={styles.zoneDetails}>
                  <Text style={styles.zoneName}>{zone.name}</Text>
                  <Text style={styles.zonePopulation}>Pop: {zone.population.toLocaleString()}</Text>
                </View>
              </View>
              <View style={styles.zoneMetrics}>
                <Text style={[styles.casesCount, { color: getRiskColorMap(zone.intensity) }]}>
                  {zone.cases} cas
                </Text>
                <Text style={styles.incidenceRate}>
                  {((zone.cases / zone.population) * 10000).toFixed(2)}/10k
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  }, []);

  // Fonctions utilitaires
  const getRiskColor = (level) => {
    return level === 'high' ? colors.error : colors.warning;
  };

  const openModal = useCallback((type) => {
    setModalType(type);
    setFormData({});
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    // Fermer le clavier avant de fermer le modal
    Keyboard.dismiss();
    setModalVisible(false);
    setFormData({});
  }, []);

  const handleSubmit = useCallback(() => {
    // Fermer le clavier immédiatement
    Keyboard.dismiss();
    
    if (modalType === 'case') {
      const newCase = {
        id: Date.now().toString(),
        name: formData.name || '',
        age: parseInt(formData.age) || 0,
        status: formData.status || 'suspected',
        symptoms: formData.symptoms || [], // Maintenant c'est déjà un array
        date: new Date().toISOString().split('T')[0],
        zone: formData.zone || ''
      };
      setCases(prev => [...prev, newCase]);
    } else if (modalType === 'contact') {
      const newContact = {
        id: Date.now().toString(),
        name: formData.name || '',
        phone: formData.phone || '',
        lastContact: formData.lastContact || new Date().toISOString().split('T')[0],
        riskLevel: formData.riskLevel || 'low'
      };
      setContacts(prev => [...prev, newContact]);
    }
    
    // Petit délai pour permettre au clavier de se fermer complètement
    setTimeout(() => {
      setModalVisible(false);
      setFormData({});
    }, 100);
  }, [modalType, formData]);

  // Modal avec dropdown des symptômes
  const renderFormModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <CustomIcon 
                  type={modalType === 'case' ? 'cases' : 'contacts'} 
                  size={32} 
                  color={modalType === 'case' ? colors.accent : colors.secondary} 
                />
                <Text style={styles.modalTitle}>
                  {modalType === 'case' ? 'NOUVEAU CAS' : 'NOUVEAU CONTACT'}
                </Text>
              </View>
              
              <ScrollView 
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Nom complet"
                  placeholderTextColor={colors.textSecondary}
                  value={formData.name || ''}
                  onChangeText={(text) => setFormData(prev => ({...prev, name: text}))}
                  autoCorrect={false}
                  autoCapitalize="words"
                  returnKeyType="next"
                  blurOnSubmit={false}
                />
                
                {modalType === 'case' ? (
                  <>
                    <TextInput
                      style={styles.input}
                      placeholder="Âge"
                      placeholderTextColor={colors.textSecondary}
                      keyboardType="numeric"
                      value={formData.age || ''}
                      onChangeText={(text) => setFormData(prev => ({...prev, age: text}))}
                      autoCorrect={false}
                      maxLength={3}
                      returnKeyType="next"
                      blurOnSubmit={false}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Zone géographique"
                      placeholderTextColor={colors.textSecondary}
                      value={formData.zone || ''}
                      onChangeText={(text) => setFormData(prev => ({...prev, zone: text}))}
                      autoCorrect={false}
                      autoCapitalize="words"
                      returnKeyType="next"
                      blurOnSubmit={false}
                    />
                    
                    {/* Nouveau composant dropdown pour les symptômes */}
                    <SymptomsDropdown
                      selectedSymptoms={formData.symptoms || []}
                      onSymptomsChange={(symptoms) => setFormData(prev => ({
                        ...prev, 
                        symptoms: symptoms
                      }))}
                    />
                    
                    {/* Statut du cas */}
                    <View style={styles.statusContainer}>
                      <Text style={styles.statusLabel}>Statut du cas:</Text>
                      <View style={styles.statusButtons}>
                        <TouchableOpacity
                          style={[
                            styles.statusButton,
                            (formData.status === 'suspected' || !formData.status) && styles.statusButtonActive
                          ]}
                          onPress={() => setFormData(prev => ({...prev, status: 'suspected'}))}
                        >
                          <Text style={[
                            styles.statusButtonText,
                            (formData.status === 'suspected' || !formData.status) && styles.statusButtonTextActive
                          ]}>
                            Suspecté
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.statusButton,
                            formData.status === 'confirmed' && styles.statusButtonActiveConfirmed
                          ]}
                          onPress={() => setFormData(prev => ({...prev, status: 'confirmed'}))}
                        >
                          <Text style={[
                            styles.statusButtonText,
                            formData.status === 'confirmed' && styles.statusButtonTextActive
                          ]}>
                            Confirmé
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </>
                ) : (
                  <>
                    <TextInput
                      style={styles.input}
                      placeholder="Numéro de téléphone"
                      placeholderTextColor={colors.textSecondary}
                      keyboardType="phone-pad"
                      value={formData.phone || ''}
                      onChangeText={(text) => setFormData(prev => ({...prev, phone: text}))}
                      autoCorrect={false}
                      autoCapitalize="none"
                      returnKeyType="next"
                      blurOnSubmit={false}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Date du dernier contact (YYYY-MM-DD)"
                      placeholderTextColor={colors.textSecondary}
                      value={formData.lastContact || ''}
                      onChangeText={(text) => setFormData(prev => ({...prev, lastContact: text}))}
                      autoCorrect={false}
                      autoCapitalize="none"
                      maxLength={10}
                      returnKeyType="done"
                    />
                    
                    {/* Niveau de risque pour les contacts */}
                    <View style={styles.statusContainer}>
                      <Text style={styles.statusLabel}>Niveau de risque:</Text>
                      <View style={styles.statusButtons}>
                        <TouchableOpacity
                          style={[
                            styles.statusButton,
                            (formData.riskLevel === 'low' || !formData.riskLevel) && styles.statusButtonActive
                          ]}
                          onPress={() => setFormData(prev => ({...prev, riskLevel: 'low'}))}
                        >
                          <Text style={[
                            styles.statusButtonText,
                            (formData.riskLevel === 'low' || !formData.riskLevel) && styles.statusButtonTextActive
                          ]}>
                            Faible
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.statusButton,
                            formData.riskLevel === 'high' && styles.statusButtonActiveConfirmed
                          ]}
                          onPress={() => setFormData(prev => ({...prev, riskLevel: 'high'}))}
                        >
                          <Text style={[
                            styles.statusButtonText,
                            formData.riskLevel === 'high' && styles.statusButtonTextActive
                          ]}>
                            Élevé
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </>
                )}
              </ScrollView>
              
              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={styles.cancelButton} 
                  onPress={closeModal}
                  activeOpacity={0.7}
                >
                  <Text style={styles.cancelButtonText}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.submitButton} 
                  onPress={handleSubmit}
                  activeOpacity={0.7}
                >
                  <Text style={styles.submitButtonText}>Enregistrer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  // Navigation en bas (adaptée selon le rôle)
  const BottomNavigation = useCallback(() => {
    const navItems = userRole === 'doctor' ? 
      [
        { key: 'dashboard', label: 'Tableau de Bord', icon: 'dashboard' },
        { key: 'cases', label: 'Cas', icon: 'cases' },
        { key: 'contacts', label: 'Contacts', icon: 'contacts' },
        { key: 'map', label: 'Carte', icon: 'map' }
      ] : 
      [
        { key: 'dashboard', label: 'Accueil', icon: 'home' },
        { key: 'map', label: 'Carte', icon: 'map' }
      ];

    return (
      <View style={styles.bottomNav}>
        {navItems.map(item => (
          <TouchableOpacity 
            key={item.key}
            style={[styles.navItem, activeTab === item.key && styles.activeNavItem]}
            onPress={() => setActiveTab(item.key)}
          >
            <View style={[styles.navIndicator, activeTab === item.key && styles.activeNavIndicator]}>
              <CustomIcon 
                type={item.icon} 
                size={20} 
                color={activeTab === item.key ? colors.textInverse : colors.textSecondary} 
              />
            </View>
            <Text style={[styles.navText, activeTab === item.key && styles.activeNavText]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }, [activeTab, userRole]);

  // Rendu du contenu selon l'onglet actif
  const renderContent = useCallback(() => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'cases':
        return <CasesManagement />;
      case 'contacts':
        return <ContactTracing />;
      case 'map':
        return <Mapping />;
      default:
        return <Dashboard />;
    }
  }, [activeTab, Dashboard, CasesManagement, ContactTracing, Mapping]);

  // Rendu principal de l'application
  if (!isAuthenticated) {
    switch (currentScreen) {
      case 'roleSelection':
        return <RoleSelectionScreen onSelectRole={handleScreenChange} />;
      case 'doctorLogin':
        return (
          <DoctorLoginScreen 
            onBack={handleBackToRole}
            onLogin={handleLogin}
            loginData={loginData}
            setLoginData={updateLoginData}
          />
        );
      case 'citizenLogin':
        return (
          <CitizenLoginScreen 
            onBack={handleBackToRole}
            onLogin={handleLogin}
            loginData={loginData}
            setLoginData={updateLoginData}
          />
        );
      default:
        return <RoleSelectionScreen onSelectRole={handleScreenChange} />;
    }
  }

  return (
    <SafeAreaView style={styles.app}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.surface} />
      {renderContent()}
      {renderFormModal()}
      <BottomNavigation />
    </SafeAreaView>
  );
};

// Styles complets avec nouvelles additions
const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 90,
  },
  
  // Styles pour les icônes personnalisées
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    padding: 4,
  },
  
  // Icône stéthoscope (docteur)
  stethoscope: {
    position: 'relative',
  },
  stethoscopeHead: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.textInverse,
    backgroundColor: 'transparent',
  },
  stethoscopeTube: {
    position: 'absolute',
    top: 10,
    left: 5,
    width: 2,
    height: 16,
    backgroundColor: colors.textInverse,
    borderRadius: 1,
  },
  
  // Icône personne
  personIcon: {
    alignItems: 'center',
  },
  personHead: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.textInverse,
    marginBottom: 2,
  },
  personBody: {
    width: 12,
    height: 10,
    backgroundColor: colors.textInverse,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  
  // Icône dashboard (grille)
  dashboardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 16,
    height: 16,
  },
  gridItem: {
    width: 6,
    height: 6,
    backgroundColor: colors.textInverse,
    marginRight: 2,
    marginBottom: 2,
    borderRadius: 1,
  },
  
  // Icône document
  documentIcon: {
    width: 14,
    height: 18,
    backgroundColor: colors.textInverse,
    borderRadius: 2,
    padding: 3,
    justifyContent: 'space-around',
  },
  documentLine: {
    height: 1,
    backgroundColor: colors.accent,
    borderRadius: 0.5,
  },
  
  // Icône contacts
  contactsIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactPerson: {
    width: 6,
    height: 12,
    backgroundColor: colors.textInverse,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  
  // Icône carte
  mapIcon: {
    alignItems: 'center',
  },
  mapPin: {
    width: 8,
    height: 8,
    backgroundColor: colors.textInverse,
    borderRadius: 4,
    marginBottom: 2,
  },
  mapBase: {
    width: 14,
    height: 8,
    backgroundColor: colors.textInverse,
    borderRadius: 2,
  },
  
  // Icône alerte
  alertTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 14,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.textInverse,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertExclamation: {
    position: 'absolute',
    bottom: 2,
    color: colors.warning,
    fontSize: 8,
    fontWeight: 'bold',
  },
  
  // Icône plus
  plusIcon: {
    position: 'relative',
    width: 16,
    height: 16,
  },
  plusHorizontal: {
    position: 'absolute',
    top: 7,
    left: 2,
    width: 12,
    height: 2,
    backgroundColor: colors.textInverse,
    borderRadius: 1,
  },
  plusVertical: {
    position: 'absolute',
    top: 2,
    left: 7,
    width: 2,
    height: 12,
    backgroundColor: colors.textInverse,
    borderRadius: 1,
  },
  
  // Icône maison
  houseIcon: {
    alignItems: 'center',
  },
  houseRoof: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.textInverse,
  },
  houseBase: {
    width: 12,
    height: 8,
    backgroundColor: colors.textInverse,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
  
  // Icône urgence (croix)
  emergencyIcon: {
    position: 'relative',
    width: 16,
    height: 16,
  },
  emergencyCross: {
    position: 'absolute',
    top: 2,
    left: 7,
    width: 2,
    height: 12,
    backgroundColor: colors.textInverse,
    borderRadius: 1,
  },
  
  // Icône info
  infoIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.textInverse,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    color: colors.info,
    fontSize: 10,
    fontWeight: 'bold',
  },
  
  // Icône par défaut
  defaultIcon: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.textInverse,
  },
  
  // Styles pour le logo du ministère
  logoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logoFrame: {
    borderWidth: 3,
    borderColor: colors.ministry,
    borderRadius: 8,
    padding: 8,
    backgroundColor: colors.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoInner: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  crescentShape: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: colors.ministry,
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    transform: [{ rotate: '45deg' }],
  },
  waveShape: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    height: 3,
    backgroundColor: colors.ministry,
    borderRadius: 2,
  },
  ministryText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.ministry,
    textAlign: 'center',
    marginTop: 8,
  },
  ministryTextFr: {
    fontSize: 10,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 2,
  },
  
  // Styles pour le dropdown des symptômes
  dropdownContainer: {
    marginBottom: 16,
    zIndex: 1000,
  },
  
  // Symptômes sélectionnés
  selectedSymptomsContainer: {
    marginBottom: 12,
  },
  selectedSymptomsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  selectedSymptomsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  selectedSymptomChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: 16,
    paddingVertical: 6,
    paddingLeft: 12,
    paddingRight: 8,
    marginBottom: 4,
  },
  selectedSymptomText: {
    color: colors.textInverse,
    fontSize: 12,
    fontWeight: '500',
    marginRight: 6,
  },
  removeSymptomButton: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeSymptomText: {
    color: colors.textInverse,
    fontSize: 12,
    fontWeight: 'bold',
    lineHeight: 14,
  },

  // Bouton dropdown
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.background,
    borderRadius: 12,
    padding: 16,
    backgroundColor: colors.surface,
  },
  dropdownButtonOpen: {
    borderColor: colors.accent,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  dropdownButtonText: {
    fontSize: 16,
    color: colors.textPrimary,
    flex: 1,
  },
  dropdownArrow: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 8,
    transform: [{ rotate: '0deg' }],
  },
  dropdownArrowOpen: {
    transform: [{ rotate: '180deg' }],
    color: colors.accent,
  },

  // Menu dropdown
  dropdownMenu: {
    borderWidth: 2,
    borderTopWidth: 0,
    borderColor: colors.accent,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: colors.surface,
    maxHeight: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },

  // Recherche
  searchInput: {
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
    padding: 12,
    fontSize: 14,
    color: colors.textPrimary,
  },

  // Liste des symptômes
  symptomsScrollView: {
    maxHeight: 200,
  },
  symptomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  symptomItemSelected: {
    backgroundColor: colors.ministryLight,
  },
  symptomCheckbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: colors.textSecondary,
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  symptomCheckboxSelected: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  symptomCheckmark: {
    color: colors.textInverse,
    fontSize: 12,
    fontWeight: 'bold',
  },
  symptomText: {
    fontSize: 14,
    color: colors.textPrimary,
    flex: 1,
  },
  symptomTextSelected: {
    fontWeight: '600',
    color: colors.accent,
  },
  noResultsText: {
    textAlign: 'center',
    color: colors.textSecondary,
    fontStyle: 'italic',
    padding: 20,
  },

  // Actions rapides
  quickActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.background,
    padding: 8,
  },
  quickActionButton: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
    borderRadius: 6,
    marginHorizontal: 4,
    backgroundColor: colors.background,
  },
  closeButton: {
    backgroundColor: colors.accent,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  closeButtonText: {
    color: colors.textInverse,
  },
  
  // Styles pour l'authentification
  authContainer: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  authContent: {
    flexGrow: 1,
    padding: 20,
    minHeight: '100%',
  },
  headerSection: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  appTitleContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textInverse,
    marginBottom: 8,
    textAlign: 'center',
  },
  appTitleFr: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textInverse,
    marginBottom: 8,
    textAlign: 'center',
  },
  appSubtitle: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 20,
  },
  
  // Styles pour la sélection de rôle
  roleContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textInverse,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  roleCard: {
    backgroundColor: colors.surface,
    padding: 24,
    borderRadius: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 2,
  },
  doctorCard: {
    borderColor: colors.accent,
  },
  citizenCard: {
    borderColor: colors.secondary,
  },
  roleIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  roleCardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  roleCardTitleAr: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 12,
  },
  roleCardDesc: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  
  // Styles pour la connexion
  backButton: {
    marginTop: 20,
    marginBottom: 20,
    padding: 8,
  },
  backButtonText: {
    color: colors.textInverse,
    fontSize: 16,
    fontWeight: '500',
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  loginHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  loginIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textInverse,
    marginBottom: 4,
  },
  loginTitleAr: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textLight,
    marginBottom: 8,
  },
  loginSubtitle: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 20,
  },
  loginForm: {
    backgroundColor: colors.surface,
    padding: 24,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  loginInput: {
    borderWidth: 2,
    borderColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: colors.surface,
    color: colors.textPrimary,
  },
  loginButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  doctorButton: {
    backgroundColor: colors.accent,
  },
  citizenButton: {
    backgroundColor: colors.secondary,
  },
  loginButtonText: {
    color: colors.textInverse,
    fontSize: 18,
    fontWeight: '600',
  },
  
  // REMARQUE : Les styles demoCredentials, demoTitle et demoText ont été supprimés
  // car ils ne sont plus utilisés dans l'interface utilisateur
  
  // Styles pour le dashboard adapté
  dashboardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerInfo: {
    marginLeft: 12,
    flex: 1,
  },
  miniLogo: {
    marginRight: 0,
  },
  welcomeText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  logoutButton: {
    backgroundColor: colors.error,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: colors.textInverse,
    fontSize: 12,
    fontWeight: '600',
  },
  restrictedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  restrictedText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginTop: 16,
  },
  
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
    marginLeft: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  addButton: {
    backgroundColor: colors.accent,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonText: {
    color: colors.textInverse,
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 4,
  },
  
  // Styles pour le dashboard
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 16,
    width: '48%',
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  statLabel: {
    color: colors.textInverse,
    fontSize: 8,
    fontWeight: 'bold',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statTitle: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  
  // Styles pour les sections
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginLeft: 8,
    letterSpacing: 0.5,
  },
  
  // Styles pour les alertes
  alertCard: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  alertIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.warning,
    marginRight: 12,
  },
  alertText: {
    color: colors.textPrimary,
    fontWeight: '500',
    flex: 1,
  },
  alertDate: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '500',
  },
  
  // Styles pour les boutons d'action
  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: colors.secondary,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    alignItems: 'center',
    flex: 0.48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  primaryAction: {
    backgroundColor: colors.accent,
  },
  secondaryAction: {
    backgroundColor: colors.secondary,
  },
  emergencyAction: {
    backgroundColor: colors.error,
    flex: 1,
  },
  infoAction: {
    backgroundColor: colors.info,
    flex: 1,
  },
  actionButtonText: {
    color: colors.textInverse,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 14,
    marginTop: 8,
  },
  
  // Styles pour les cas
  caseCard: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  caseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  caseNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  caseName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginLeft: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: colors.textInverse,
    fontSize: 12,
    fontWeight: '600',
  },
  caseDetails: {
    marginTop: 8,
  },
  caseInfo: {
    color: colors.textSecondary,
    marginBottom: 6,
    fontSize: 14,
  },
  
  // Styles pour les contacts
  contactCard: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  contactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginLeft: 8,
  },
  contactDetails: {
    marginBottom: 12,
  },
  contactInfo: {
    color: colors.textSecondary,
    marginBottom: 6,
    fontSize: 14,
  },
  riskBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  riskText: {
    color: colors.textInverse,
    fontSize: 12,
    fontWeight: '600',
  },

  // Styles pour la heatmap
  viewControls: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  viewButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeViewButton: {
    backgroundColor: '#6366F1',
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },
  activeViewButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  // Styles pour la heatmap
  heatmapContainer: {
    position: 'relative',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    overflow: 'hidden',
  },
  heatmapZone: {
    position: 'absolute',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  zoneTouch: {
    flex: 1,
    position: 'relative',
  },
  zoneContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  zoneCases: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  zoneNameSmall: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  pulseRing: {
    position: 'absolute',
    top: -5,
    left: -5,
    right: -5,
    bottom: -5,
    borderRadius: 13,
    borderWidth: 2,
    opacity: 0.6,
  },
  gridOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
  },
  gridLine: {
    position: 'absolute',
    backgroundColor: '#64748B',
  },
  horizontalLine: {
    left: 0,
    right: 0,
    height: 1,
  },
  verticalLine: {
    top: 0,
    bottom: 0,
    width: 1,
  },

  // Styles pour la légende
  legendContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  legendGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  
  // Styles pour la carte
  mapContainer: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  mapHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  mapSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  mapWrapper: {
    position: 'relative',
  },
  mapControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  mapButton: {
    backgroundColor: colors.accent,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 0.3,
  },
  mapButtonText: {
    color: colors.textInverse,
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // Styles pour le panneau d'information
  zoneInfoPanel: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#6366F1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  zoneInfoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  zoneInfoTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  zoneIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  zoneInfoName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  closeButton: {
    fontSize: 18,
    color: '#6B7280',
    paddingHorizontal: 8,
  },
  zoneStats: {
    marginTop: 8,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },

  // Styles pour les statistiques globales
  globalStats: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  statsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'center',
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
    letterSpacing: 0.5,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCardNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6366F1',
    marginBottom: 4,
  },
  statCardLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },

  // Styles pour la liste des zones
  zonesList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  zonesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'center',
  },
  zonesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
    letterSpacing: 0.5,
  },
  zoneListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  zoneInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  zoneIcon: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  zoneDetails: {
    flex: 1,
  },
  zoneName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  zonePopulation: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  zoneMetrics: {
    alignItems: 'flex-end',
  },
  casesCount: {
    fontSize: 14,
    fontWeight: '600',
  },
  incidenceRate: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },

  // Styles pour la vue traditionnelle
  staticMap: {
    height: 280,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  mapZone: {
    position: 'absolute',
    alignItems: 'center',
  },
  zoneMarker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  markerText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  zoneLabel: {
    fontSize: 8,
    color: '#1F2937',
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  
  // Styles pour le modal avec statut
  statusContainer: {
    marginBottom: 16,
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  statusButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  statusButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.background,
    backgroundColor: colors.surface,
    alignItems: 'center',
  },
  statusButtonActive: {
    borderColor: colors.warning,
    backgroundColor: colors.warning,
  },
  statusButtonActiveConfirmed: {
    borderColor: colors.error,
    backgroundColor: colors.error,
  },
  statusButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  statusButtonTextActive: {
    color: colors.textInverse,
  },
  
  // Styles pour le modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    backgroundColor: colors.surface,
    padding: 24,
    borderRadius: 20,
    width: '90%',
    maxWidth: 400,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginLeft: 8,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: 2,
    borderColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: colors.surface,
    color: colors.textPrimary,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  cancelButton: {
    backgroundColor: colors.textSecondary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    flex: 0.45,
  },
  cancelButtonText: {
    color: colors.textInverse,
    textAlign: 'center',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    flex: 0.45,
  },
  submitButtonText: {
    color: colors.textInverse,
    textAlign: 'center',
    fontWeight: '600',
  },
  
  // Styles pour la navigation
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: colors.background,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 12,
  },
  activeNavItem: {
    backgroundColor: colors.accent,
  },
  navIndicator: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
    marginBottom: 4,
    backgroundColor: 'transparent',
  },
  activeNavIndicator: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  navText: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  activeNavText: {
    color: colors.textInverse,
    fontWeight: '600',
  },
});

export default EpidemicManagementApp;