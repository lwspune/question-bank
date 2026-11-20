import { ChevronRight, Dumbbell } from "lucide-react";
import KatexRenderer from "@/components/math/KatexRenderer";
import RichText from "@/components/math/RichText";
import WorkedExampleCard from "@/app/guide/_components/WorkedExampleCard";
import { buildBrowseUrl } from "@/lib/guide/buildBrowseUrl";
import type { WorkedExample } from "@/lib/guide/loadWorkedExamples";
import type { ConceptUnit } from "@/app/notes/_types";
import FormulaBlock from "./FormulaBlock";
import WorkedExampleAuthored from "./WorkedExampleAuthored";
import SelfCheckCard from "./SelfCheckCard";
import PracticeSet from "./PracticeSet";
import PracticeGate from "./PracticeGate";
import TrapCallout from "./TrapCallout";
import ReferenceTableBlock from "./ReferenceTableBlock";
import ReportConceptDialog from "./ReportConceptDialog";
import NotesDrillButton from "./NotesDrillButton";
import RegressionLineFit from "./visualizations/RegressionLineFit";
import VarianceSquaredDeviations from "./visualizations/VarianceSquaredDeviations";
import HistogramBinSlider from "./visualizations/HistogramBinSlider";
import VectorAddition from "./visualizations/VectorAddition";
import VectorProjection from "./visualizations/VectorProjection";
import CrossProductArea from "./visualizations/CrossProductArea";
import DiceSumGrid from "./visualizations/DiceSumGrid";
import VennTwoEvents from "./visualizations/VennTwoEvents";
import ProbabilityTree from "./visualizations/ProbabilityTree";
import SkewMeanMedianMode from "./visualizations/SkewMeanMedianMode";
import PieChartSectors from "./visualizations/PieChartSectors";
import CorrelationScatter from "./visualizations/CorrelationScatter";
import RightHandRuleCrossProduct3D from "./visualizations/RightHandRuleCrossProduct3D";
import UnitNormalVector3D from "./visualizations/UnitNormalVector3D";
import DirectionCosines3D from "./visualizations/DirectionCosines3D";
import TripleProductBoxSvg from "./visualizations/TripleProductBoxSvg";
import SectionFormula from "./visualizations/SectionFormula";
import TriangleCentroid from "./visualizations/TriangleCentroid";
import ParallelogramDiagonals from "./visualizations/ParallelogramDiagonals";
import ExclusiveVsIndependent from "./visualizations/ExclusiveVsIndependent";
import ConditionalRestrict from "./visualizations/ConditionalRestrict";
import SetOperationsVenn from "./visualizations/SetOperationsVenn";
import MedianMiddleValue from "./visualizations/MedianMiddleValue";
import ModeBarPlot from "./visualizations/ModeBarPlot";
import MeanBalancePoint from "./visualizations/MeanBalancePoint";
import MeanDeviationSpread from "./visualizations/MeanDeviationSpread";
import IdentifyRegressionLine from "./visualizations/IdentifyRegressionLine";
import AngleBetweenRegressionLines from "./visualizations/AngleBetweenRegressionLines";
import ComponentFormBasis3D from "./visualizations/ComponentFormBasis3D";
import OrthogonalTriple3D from "./visualizations/OrthogonalTriple3D";
import TorqueMoment3D from "./visualizations/TorqueMoment3D";
import PositionDisplacementVectors from "./visualizations/PositionDisplacementVectors";
import MagnitudeRightTriangle from "./visualizations/MagnitudeRightTriangle";
import ScalarMultiplication from "./visualizations/ScalarMultiplication";
import DotProductWork from "./visualizations/DotProductWork";
import SampleSpaceEvent from "./visualizations/SampleSpaceEvent";
import CoinTossTree from "./visualizations/CoinTossTree";
import NeitherComplementUnion from "./visualizations/NeitherComplementUnion";
import ExhaustiveEvents from "./visualizations/ExhaustiveEvents";
import CompressionRarefactionWave from "./visualizations/CompressionRarefactionWave";
import BeatsEnvelope from "./visualizations/BeatsEnvelope";
import EarAnatomy from "./visualizations/EarAnatomy";
import FrequencySpectrumStrip from "./visualizations/FrequencySpectrumStrip";
import EchoGeometry from "./visualizations/EchoGeometry";
import AntiderivativeFamily from "./visualizations/AntiderivativeFamily";
import OctantsCoordinatePlanes from "./visualizations/OctantsCoordinatePlanes";
import LinePlaneIntersection from "./visualizations/LinePlaneIntersection";
import PlaneWithNormal from "./visualizations/PlaneWithNormal";
import SpherePlaneTangency from "./visualizations/SpherePlaneTangency";
import AngleBetweenLines3D from "./visualizations/AngleBetweenLines3D";
import SphereCentreRadius3D from "./visualizations/SphereCentreRadius3D";
import DeterminantAsArea from "./visualizations/DeterminantAsArea";
import CofactorSignGrid from "./visualizations/CofactorSignGrid";
import SarrusRule from "./visualizations/SarrusRule";
import FieldLinesCharge from "./visualizations/FieldLinesCharge";
import IVCharacteristicGraph from "./visualizations/IVCharacteristicGraph";
import ResistanceWireGeometry from "./visualizations/ResistanceWireGeometry";
import ResistorsSeriesParallel from "./visualizations/ResistorsSeriesParallel";
import EmfInternalResistance from "./visualizations/EmfInternalResistance";
import MagneticFieldAroundWire from "./visualizations/MagneticFieldAroundWire";
import FlemingsLeftHandRule from "./visualizations/FlemingsLeftHandRule";
import ImatChartTypes from "./visualizations/ImatChartTypes";
import SscIncomeAggregates from "./visualizations/SscIncomeAggregates";
import SscPlanTimeline from "./visualizations/SscPlanTimeline";
import SscBudgetDeficits from "./visualizations/SscBudgetDeficits";
import SscElasticityScale from "./visualizations/SscElasticityScale";
import SscPeriodicGroups from "./visualizations/SscPeriodicGroups";
import SscHydrocarbonFamilies from "./visualizations/SscHydrocarbonFamilies";
import SscRedoxNumbers from "./visualizations/SscRedoxNumbers";
import SscMilkPh from "./visualizations/SscMilkPh";
import SscMassPercent from "./visualizations/SscMassPercent";
import SscValencyCross from "./visualizations/SscValencyCross";
import SscSatelliteOrbits from "./visualizations/SscSatelliteOrbits";
import SscVernierParts from "./visualizations/SscVernierParts";
import SscMatkaCooling from "./visualizations/SscMatkaCooling";
import SscRigidRotation from "./visualizations/SscRigidRotation";
import JeeCarbocationShift from "./visualizations/JeeCarbocationShift";
import JeeDiboraneBorazine from "./visualizations/JeeDiboraneBorazine";
import JeeSpinOnlyMoment from "./visualizations/JeeSpinOnlyMoment";
import JeePhenoxideResonance from "./visualizations/JeePhenoxideResonance";
import JeeAmineBasicity from "./visualizations/JeeAmineBasicity";
import NeetXenonShapes from "./visualizations/NeetXenonShapes";
import NeetLanthanoidContraction from "./visualizations/NeetLanthanoidContraction";
import NeetAmineBasicity from "./visualizations/NeetAmineBasicity";
import NeetLimitingReagent from "./visualizations/NeetLimitingReagent";
import NeetRedoxBalance from "./visualizations/NeetRedoxBalance";
import NeetPhenolAcidity from "./visualizations/NeetPhenolAcidity";
import SscPlantGroups from "./visualizations/SscPlantGroups";
import SscBloodFlow from "./visualizations/SscBloodFlow";
import SscBacterialShapes from "./visualizations/SscBacterialShapes";
import NeetCoelomTypes from "./visualizations/NeetCoelomTypes";
import NeetSimpleEpithelium from "./visualizations/NeetSimpleEpithelium";
import NeetHormoneAction from "./visualizations/NeetHormoneAction";
import NeetPlasmodiumCycle from "./visualizations/NeetPlasmodiumCycle";
import NeetArtTransfers from "./visualizations/NeetArtTransfers";
import NeetBtToxin from "./visualizations/NeetBtToxin";
import CetMoleChain from "./visualizations/CetMoleChain";
import CetNitrophenolHBonds from "./visualizations/CetNitrophenolHBonds";
import CetAmineNHTests from "./visualizations/CetAmineNHTests";
import CetSpinOnlyMoment from "./visualizations/CetSpinOnlyMoment";
import CetXenonShapes from "./visualizations/CetXenonShapes";
import CetOxidationLadder from "./visualizations/CetOxidationLadder";
import CetFreundlichPlots from "./visualizations/CetFreundlichPlots";
import CetSolvayLoop from "./visualizations/CetSolvayLoop";
import CetPentaneCarbonTypes from "./visualizations/CetPentaneCarbonTypes";
import CetNanoDimensions from "./visualizations/CetNanoDimensions";
import CetAlkyneReduction from "./visualizations/CetAlkyneReduction";
import JeeMatrixRowColumn from "./visualizations/JeeMatrixRowColumn";
import JeeTwoLinesParameter from "./visualizations/JeeTwoLinesParameter";
import JeeImplicationFalseRows from "./visualizations/JeeImplicationFalseRows";
import JeeRepeatedParts from "./visualizations/JeeRepeatedParts";
import SscPipesNetFill from "./visualizations/SscPipesNetFill";
import SscSquareOfSum from "./visualizations/SscSquareOfSum";
import SscNestedBrackets from "./visualizations/SscNestedBrackets";
import SscCiVsSi from "./visualizations/SscCiVsSi";
import SscLinesSolutionCount from "./visualizations/SscLinesSolutionCount";
import SscTrapeziumDiagonals from "./visualizations/SscTrapeziumDiagonals";
import CetWienPeak from "./visualizations/CetWienPeak";
import CetGHeightDepth from "./visualizations/CetGHeightDepth";
import CetHysteresisLoop from "./visualizations/CetHysteresisLoop";
import CetErrorsAdd from "./visualizations/CetErrorsAdd";
import CetCutSpring from "./visualizations/CetCutSpring";
import JeeHeatingCurve from "./visualizations/JeeHeatingCurve";
import JeeAmEnvelope from "./visualizations/JeeAmEnvelope";
import NeetEmWaveFields from "./visualizations/NeetEmWaveFields";
import SscT2SeriesBlock from "./visualizations/SscT2SeriesBlock";
import SscT2SignRewrite from "./visualizations/SscT2SignRewrite";
import SscT2DsRow from "./visualizations/SscT2DsRow";
import SscT2CodedRelations from "./visualizations/SscT2CodedRelations";
import SscT2SharedCode from "./visualizations/SscT2SharedCode";
import SscT2LetterSteps from "./visualizations/SscT2LetterSteps";
import SscT2OddPair from "./visualizations/SscT2OddPair";
import SscT2DigitsInPlace from "./visualizations/SscT2DigitsInPlace";
import SscT2CauseLinks from "./visualizations/SscT2CauseLinks";
import SscT2FigureSeries from "./visualizations/SscT2FigureSeries";
import SscT2SegmentDigits from "./visualizations/SscT2SegmentDigits";
import SscT2MemoryLadder from "./visualizations/SscT2MemoryLadder";
import SscT2ExcelRange from "./visualizations/SscT2ExcelRange";
import SscT2UploadDownload from "./visualizations/SscT2UploadDownload";
import SscT2SoftwareLayers from "./visualizations/SscT2SoftwareLayers";
import SscT2SecurityTools from "./visualizations/SscT2SecurityTools";
import SscT2HubSwitch from "./visualizations/SscT2HubSwitch";
import NeetTaxonHierarchy from "./visualizations/NeetTaxonHierarchy";
import NeetLifeCyclePatterns from "./visualizations/NeetLifeCyclePatterns";
import NeetCambiumRing from "./visualizations/NeetCambiumRing";
import NeetGrowthCurves from "./visualizations/NeetGrowthCurves";
import NeetDihybridCross from "./visualizations/NeetDihybridCross";
import NeetBrewedDrinks from "./visualizations/NeetBrewedDrinks";
import NeetSpeciesArea from "./visualizations/NeetSpeciesArea";
import SscT2MilkReplacement from "./visualizations/SscT2MilkReplacement";
import SscT2AngleBisector from "./visualizations/SscT2AngleBisector";
import SscT2SquareOfSum from "./visualizations/SscT2SquareOfSum";
import SscT2CiMinusSi from "./visualizations/SscT2CiMinusSi";
import SscT2WorkUnits from "./visualizations/SscT2WorkUnits";
import SscT2CombinedAverage from "./visualizations/SscT2CombinedAverage";
import SscT2PairOfLines from "./visualizations/SscT2PairOfLines";
import SscT2ChordDistance from "./visualizations/SscT2ChordDistance";
import SscT2Trapezium from "./visualizations/SscT2Trapezium";
import SscRowRuleGrid from "./visualizations/SscRowRuleGrid";
import SscWeekWheel from "./visualizations/SscWeekWheel";
import SscBodmasRow from "./visualizations/SscBodmasRow";
import SscOppositeLetters from "./visualizations/SscOppositeLetters";
import SscAlphabetPositions from "./visualizations/SscAlphabetPositions";
import SscDifferenceLadder from "./visualizations/SscDifferenceLadder";
import SscTurningArrow from "./visualizations/SscTurningArrow";
import SscGridSquares from "./visualizations/SscGridSquares";
import SscInequalityChain from "./visualizations/SscInequalityChain";
import SscSymmetryQuarters from "./visualizations/SscSymmetryQuarters";
import SscSoundMedia from "./visualizations/SscSoundMedia";
import SscRespirationStages from "./visualizations/SscRespirationStages";
import SscDecayModes from "./visualizations/SscDecayModes";
import SscLeafVenation from "./visualizations/SscLeafVenation";
import SscRainfallTypes from "./visualizations/SscRainfallTypes";
import SscStomataTranspiration from "./visualizations/SscStomataTranspiration";
import SscDemographicTransition from "./visualizations/SscDemographicTransition";
import SscGlacialKarstLandforms from "./visualizations/SscGlacialKarstLandforms";
import SscMirrorWaterImage from "./visualizations/SscMirrorWaterImage";
import SscFamilyTree from "./visualizations/SscFamilyTree";
import SscMediansCentroid from "./visualizations/SscMediansCentroid";
import SscTowerTwoObservers from "./visualizations/SscTowerTwoObservers";
import SscCylinderNet from "./visualizations/SscCylinderNet";
import SscSphereInCylinder from "./visualizations/SscSphereInCylinder";
import SscAlligationCross from "./visualizations/SscAlligationCross";
import SscBoatsStreams from "./visualizations/SscBoatsStreams";
import NeetCountercurrent from "./visualizations/NeetCountercurrent";
import NeetCardiacConduction from "./visualizations/NeetCardiacConduction";
import NeetMenstrualCycle from "./visualizations/NeetMenstrualCycle";
import NeetNeuronStructure from "./visualizations/NeetNeuronStructure";
import NeetMeiosisProphase from "./visualizations/NeetMeiosisProphase";
import NeetThylakoidChemiosmosis from "./visualizations/NeetThylakoidChemiosmosis";
import NeetPrismDeviation from "./visualizations/NeetPrismDeviation";
import NeetEquipotentials from "./visualizations/NeetEquipotentials";
import NeetCapacitorDielectric from "./visualizations/NeetCapacitorDielectric";
import NeetEthaneConformations from "./visualizations/NeetEthaneConformations";
import NeetCarbocationStability from "./visualizations/NeetCarbocationStability";
import NeetChemPvWork from "./visualizations/NeetChemPvWork";
import NeetZScheme from "./visualizations/NeetZScheme";
import NeetCalvinCycle from "./visualizations/NeetCalvinCycle";
import NeetKranzAnatomy from "./visualizations/NeetKranzAnatomy";
import NeetRespirationPathway from "./visualizations/NeetRespirationPathway";
import NeetLacOperon from "./visualizations/NeetLacOperon";
import NeetEmbryoSac from "./visualizations/NeetEmbryoSac";
import JeePointImageLine from "./visualizations/JeePointImageLine";
import JeeChordLength from "./visualizations/JeeChordLength";
import JeeTwoCircles from "./visualizations/JeeTwoCircles";
import JeeHyperbolaFocal from "./visualizations/JeeHyperbolaFocal";
import JeeEllipseFocal from "./visualizations/JeeEllipseFocal";
import JeeSkewLinesDistance from "./visualizations/JeeSkewLinesDistance";
import JeeComplexRotation from "./visualizations/JeeComplexRotation";
import JeeMeanValueTheorem from "./visualizations/JeeMeanValueTheorem";
import JeeRiemannSum from "./visualizations/JeeRiemannSum";
import JeeCrystalFieldSplitting from "./visualizations/JeeCrystalFieldSplitting";
import JeeMoDiagram from "./visualizations/JeeMoDiagram";
import JeeRaoultDeviations from "./visualizations/JeeRaoultDeviations";
import JeeReactionOrderPlots from "./visualizations/JeeReactionOrderPlots";
import JeeArrheniusPlot from "./visualizations/JeeArrheniusPlot";
import JeeRadialProbability from "./visualizations/JeeRadialProbability";
import JeeBornHaber from "./visualizations/JeeBornHaber";
import JeeComplexIsomers from "./visualizations/JeeComplexIsomers";
import JeeMovingRodEmf from "./visualizations/JeeMovingRodEmf";
import JeeMalusPolaroids from "./visualizations/JeeMalusPolaroids";
import JeeGaussFieldGraphs from "./visualizations/JeeGaussFieldGraphs";
import JeeTerminalVelocity from "./visualizations/JeeTerminalVelocity";
import JeeWheatstoneBridge from "./visualizations/JeeWheatstoneBridge";
import JeeVernierScale from "./visualizations/JeeVernierScale";
import JeeLogicGateSwitches from "./visualizations/JeeLogicGateSwitches";
import JeeMagneticDipoleTorque from "./visualizations/JeeMagneticDipoleTorque";
import JeeApparentDepth from "./visualizations/JeeApparentDepth";
import JeePvWorkArea from "./visualizations/JeePvWorkArea";
import JeeForceDisplacementArea from "./visualizations/JeeForceDisplacementArea";
import JeeStressStrain from "./visualizations/JeeStressStrain";
import JeeParallelAxis from "./visualizations/JeeParallelAxis";
import JeeShmEnergyGraphs from "./visualizations/JeeShmEnergyGraphs";
import JeePrismMinDeviation from "./visualizations/JeePrismMinDeviation";
import JeeBindingEnergyCurve from "./visualizations/JeeBindingEnergyCurve";
import JeeMaxwellSpeeds from "./visualizations/JeeMaxwellSpeeds";
import CetLppCornerPoints from "./visualizations/CetLppCornerPoints";
import CetLppHalfPlane from "./visualizations/CetLppHalfPlane";
import CetPairOfLinesAngle from "./visualizations/CetPairOfLinesAngle";
import CetUnitCircleSolutions from "./visualizations/CetUnitCircleSolutions";
import CetArgandRotation from "./visualizations/CetArgandRotation";
import CetModulusCircle from "./visualizations/CetModulusCircle";
import CetDeSolutionFamily from "./visualizations/CetDeSolutionFamily";
import CetCoolingCurve from "./visualizations/CetCoolingCurve";
import CetSn1VsSn2 from "./visualizations/CetSn1VsSn2";
import CetEasMechanism from "./visualizations/CetEasMechanism";
import CetDirectingEffects from "./visualizations/CetDirectingEffects";
import CetCarbonylAddition from "./visualizations/CetCarbonylAddition";
import CetSaytzeffElimination from "./visualizations/CetSaytzeffElimination";
import CetChainGrowth from "./visualizations/CetChainGrowth";
import CetUnitCellCounting from "./visualizations/CetUnitCellCounting";
import CetTetraOctaVoids from "./visualizations/CetTetraOctaVoids";
import CetEdgeLengthRadius from "./visualizations/CetEdgeLengthRadius";
import CetDElectronPairing from "./visualizations/CetDElectronPairing";
import CetGlucoseRingClosure from "./visualizations/CetGlucoseRingClosure";
import CetDnaBasePairing from "./visualizations/CetDnaBasePairing";
import CetHessCycle from "./visualizations/CetHessCycle";
import CetGibbsSign from "./visualizations/CetGibbsSign";
import CetRaoultTwoLiquids from "./visualizations/CetRaoultTwoLiquids";
import CetMolarConductivityDilution from "./visualizations/CetMolarConductivityDilution";
import CetFirstOrderPlot from "./visualizations/CetFirstOrderPlot";
import CetBoilingPointElevation from "./visualizations/CetBoilingPointElevation";
import CetPnDepletion from "./visualizations/CetPnDepletion";
import CetDiodeBias from "./visualizations/CetDiodeBias";
import CetRectifierWaves from "./visualizations/CetRectifierWaves";
import CetPhotoelectricThreshold from "./visualizations/CetPhotoelectricThreshold";
import CetPhotoelectricGraphs from "./visualizations/CetPhotoelectricGraphs";
import CetHydrogenSeries from "./visualizations/CetHydrogenSeries";
import CetStandingWaveModes from "./visualizations/CetStandingWaveModes";
import CetPipeModes from "./visualizations/CetPipeModes";
import CetBeatsEnvelope from "./visualizations/CetBeatsEnvelope";
import CetShmReferenceCircle from "./visualizations/CetShmReferenceCircle";
import CetYdseFringeWidth from "./visualizations/CetYdseFringeWidth";
import CetDopplerWavefronts from "./visualizations/CetDopplerWavefronts";
import CetLcrPhasors from "./visualizations/CetLcrPhasors";
import CetResonanceCurve from "./visualizations/CetResonanceCurve";
import CetLenzMagnetCoil from "./visualizations/CetLenzMagnetCoil";
import CetContinuityPipe from "./visualizations/CetContinuityPipe";
import CetDipoleTorque from "./visualizations/CetDipoleTorque";
import CetRollingEnergySplit from "./visualizations/CetRollingEnergySplit";
import ImatSupplyDemand from "./visualizations/ImatSupplyDemand";
import ImatEuTimeline from "./visualizations/ImatEuTimeline";
import ImatItalianInstitutions from "./visualizations/ImatItalianInstitutions";
import ImatVseprShapes from "./visualizations/ImatVseprShapes";
import ImatTitrationCurve from "./visualizations/ImatTitrationCurve";
import ImatEnergyProfile from "./visualizations/ImatEnergyProfile";
import ImatCatalystProfile from "./visualizations/ImatCatalystProfile";
import ImatLeChatelier from "./visualizations/ImatLeChatelier";
import ImatAufbauFilling from "./visualizations/ImatAufbauFilling";
import ImatHalfLifeDecay from "./visualizations/ImatHalfLifeDecay";
import ImatMomentsSeesaw from "./visualizations/ImatMomentsSeesaw";
import ImatSnellRefraction from "./visualizations/ImatSnellRefraction";
import ImatEmSpectrum from "./visualizations/ImatEmSpectrum";
import ImatSuperposition from "./visualizations/ImatSuperposition";
import ImatCircularMotion from "./visualizations/ImatCircularMotion";
import ImatCollisionMomentum from "./visualizations/ImatCollisionMomentum";
import ImatSyllogismVenn from "./visualizations/ImatSyllogismVenn";
import ImatPaintedCube from "./visualizations/ImatPaintedCube";
import ImatGridRoutes from "./visualizations/ImatGridRoutes";
import ImatSeatingCircle from "./visualizations/ImatSeatingCircle";
import ImatPaperFolding from "./visualizations/ImatPaperFolding";
import ImatCubeNetFold from "./visualizations/ImatCubeNetFold";
import ImatCardiacCycle from "./visualizations/ImatCardiacCycle";
import ImatDoubleCirculation from "./visualizations/ImatDoubleCirculation";
import ImatActionPotential from "./visualizations/ImatActionPotential";
import ImatSynapse from "./visualizations/ImatSynapse";
import ImatSarcomere from "./visualizations/ImatSarcomere";
import ImatCrossBridge from "./visualizations/ImatCrossBridge";
import ImatOxygenDissociation from "./visualizations/ImatOxygenDissociation";
import ImatHardyWeinberg from "./visualizations/ImatHardyWeinberg";
import ImatSelectionTypes from "./visualizations/ImatSelectionTypes";
import ImatPopulationGrowth from "./visualizations/ImatPopulationGrowth";
import ImatBacterialGrowthCurve from "./visualizations/ImatBacterialGrowthCurve";
import ImatLyticLysogenic from "./visualizations/ImatLyticLysogenic";
import ImatSaVolume from "./visualizations/ImatSaVolume";
import ImatMeiosisCounts from "./visualizations/ImatMeiosisCounts";
import ImatReplicationFork from "./visualizations/ImatReplicationFork";
import ImatTranscription from "./visualizations/ImatTranscription";
import ImatTranslation from "./visualizations/ImatTranslation";
import ImatPcrCycles from "./visualizations/ImatPcrCycles";
import ImatGelElectrophoresis from "./visualizations/ImatGelElectrophoresis";
import ImatChemiosmosis from "./visualizations/ImatChemiosmosis";
import ImatChloroplastReactions from "./visualizations/ImatChloroplastReactions";
import ImatEnzymeTempPh from "./visualizations/ImatEnzymeTempPh";
import ImatMichaelisMenten from "./visualizations/ImatMichaelisMenten";
import ImatEnzymeInhibition from "./visualizations/ImatEnzymeInhibition";
import ImatPunnettSquare from "./visualizations/ImatPunnettSquare";
import ImatPedigreeSymbols from "./visualizations/ImatPedigreeSymbols";
import ImatBoyleCurve from "./visualizations/ImatBoyleCurve";
import ImatCharlesLine from "./visualizations/ImatCharlesLine";
import ImatPhaseDiagram from "./visualizations/ImatPhaseDiagram";
import ImatGalvanicCell from "./visualizations/ImatGalvanicCell";
import ImatChiralityMirror from "./visualizations/ImatChiralityMirror";
import ImatCisTrans from "./visualizations/ImatCisTrans";
import ImatIonisationJumps from "./visualizations/ImatIonisationJumps";
import ImatGraphTransformations from "./visualizations/ImatGraphTransformations";
import ImatTrigGraphs from "./visualizations/ImatTrigGraphs";
import ImatSignChart from "./visualizations/ImatSignChart";
import ImatSectorArc from "./visualizations/ImatSectorArc";
import ImatSimilarScaling from "./visualizations/ImatSimilarScaling";
import ImatParallelAngles from "./visualizations/ImatParallelAngles";
import ImatStandardGraphs from "./visualizations/ImatStandardGraphs";
import ImatRadianArc from "./visualizations/ImatRadianArc";
import ImatMitosisSteps from "./visualizations/ImatMitosisSteps";
import MagneticForceTriad from "./visualizations/MagneticForceTriad";
import BarMagnetFieldLines from "./visualizations/BarMagnetFieldLines";
import SolenoidFieldLines from "./visualizations/SolenoidFieldLines";
import AmGmHmMeans from "./visualizations/AmGmHmMeans";
import BinomialPmfInteractive from "./visualizations/BinomialPmfInteractive";
import BinomialCoefficientTree from "./visualizations/BinomialCoefficientTree";
import BinomialTailShading from "./visualizations/BinomialTailShading";
import BinomialMeanSpread from "./visualizations/BinomialMeanSpread";
import FunctionMappingDiagram from "./visualizations/FunctionMappingDiagram";
import DomainRangeGraph from "./visualizations/DomainRangeGraph";
import EvenOddSymmetry from "./visualizations/EvenOddSymmetry";
import CompositionMachine from "./visualizations/CompositionMachine";
import InverseReflectionLine from "./visualizations/InverseReflectionLine";
import GreatestIntegerStaircase from "./visualizations/GreatestIntegerStaircase";
import DiffTangentSlope from "./visualizations/DiffTangentSlope";
import DiffModulusCorner from "./visualizations/DiffModulusCorner";
import DiffPiecewiseJoin from "./visualizations/DiffPiecewiseJoin";
import TrigAstcQuadrants from "./visualizations/TrigAstcQuadrants";
import TrigAmplitudePhase from "./visualizations/TrigAmplitudePhase";
import LimDiscontinuityTypes from "./visualizations/LimDiscontinuityTypes";
import LimOneSidedApproach from "./visualizations/LimOneSidedApproach";
import AodSignOfDerivative from "./visualizations/AodSignOfDerivative";
import AodExtremaCurve from "./visualizations/AodExtremaCurve";
import LinesAngleBetween from "./visualizations/LinesAngleBetween";
import LinesDistancePointLine from "./visualizations/LinesDistancePointLine";
import PcGeometricCounting from "./visualizations/PcGeometricCounting";
import CnArgandPlane from "./visualizations/CnArgandPlane";
import CnCubeRootsCircle from "./visualizations/CnCubeRootsCircle";
import HpHeartChambers from "./visualizations/HpHeartChambers";
import HpEyeCrossSection from "./visualizations/HpEyeCrossSection";
import HpNephronSchematic from "./visualizations/HpNephronSchematic";
import HpReflexArc from "./visualizations/HpReflexArc";
import HpLungVolumes from "./visualizations/HpLungVolumes";
import HpAlveolusGasExchange from "./visualizations/HpAlveolusGasExchange";
import CarbAllotropeStructures from "./visualizations/CarbAllotropeStructures";
import AtomBohrShells from "./visualizations/AtomBohrShells";
import AtomPeriodicTrends from "./visualizations/AtomPeriodicTrends";
import MattStatesOfMatter from "./visualizations/MattStatesOfMatter";
import CarbMicelle from "./visualizations/CarbMicelle";
import CarbFunctionalGroups from "./visualizations/CarbFunctionalGroups";
import AcidPhScaleStrip from "./visualizations/AcidPhScaleStrip";
import MattDistillationApparatus from "./visualizations/MattDistillationApparatus";
import MattColloidTyndall from "./visualizations/MattColloidTyndall";
import BondIonicCovalentFormation from "./visualizations/BondIonicCovalentFormation";
import HydWaterHydrogenBonding from "./visualizations/HydWaterHydrogenBonding";
import RxnReactionTypes from "./visualizations/RxnReactionTypes";
import OptConcaveMirrorRays from "./visualizations/OptConcaveMirrorRays";
import OptConvexMirrorRays from "./visualizations/OptConvexMirrorRays";
import OptRefractionTIR from "./visualizations/OptRefractionTIR";
import OptConvexLensRays from "./visualizations/OptConvexLensRays";
import OptPrismDispersion from "./visualizations/OptPrismDispersion";
import OptHumanEye from "./visualizations/OptHumanEye";
import LmfFreeBodyDiagram from "./visualizations/LmfFreeBodyDiagram";
import LmfActionReactionPair from "./visualizations/LmfActionReactionPair";
import LmfResultantParallelogram from "./visualizations/LmfResultantParallelogram";
import LmfFrictionIncline from "./visualizations/LmfFrictionIncline";
import HtHeatTransferModes from "./visualizations/HtHeatTransferModes";
import HtPvProcessDiagram from "./visualizations/HtPvProcessDiagram";
import HtAnomalousWaterExpansion from "./visualizations/HtAnomalousWaterExpansion";
import PhotoelectricSetup from "./visualizations/PhotoelectricSetup";
import BohrEnergyLevels from "./visualizations/BohrEnergyLevels";
import RadiationPenetration from "./visualizations/RadiationPenetration";
import KinVelocityTimeGraph from "./visualizations/KinVelocityTimeGraph";
import KinPositionTimeGraph from "./visualizations/KinPositionTimeGraph";
import KinProjectileParabola from "./visualizations/KinProjectileParabola";
import FluidPressureDepth from "./visualizations/FluidPressureDepth";
import SurfaceTensionMeniscus from "./visualizations/SurfaceTensionMeniscus";
import ArchimedesFloatingBlock from "./visualizations/ArchimedesFloatingBlock";
import PascalHydraulicPress from "./visualizations/PascalHydraulicPress";
import WepWorkAtAngle from "./visualizations/WepWorkAtAngle";
import WepEnergyConservationTrack from "./visualizations/WepEnergyConservationTrack";
import GravKeplerOrbit from "./visualizations/GravKeplerOrbit";
import GravCompositeSphere from "./visualizations/GravCompositeSphere";
import GravFieldVsPotential from "./visualizations/GravFieldVsPotential";
import UmdLeastCountRuler from "./visualizations/UmdLeastCountRuler";
import OscShmDisplacementTime from "./visualizations/OscShmDisplacementTime";
import OscPendulumRestoringForce from "./visualizations/OscPendulumRestoringForce";
import OscWaveTypes from "./visualizations/OscWaveTypes";
import SetsVennTwo from "./visualizations/SetsVennTwo";
import SetsVennThree from "./visualizations/SetsVennThree";
import SetsRelationDigraph from "./visualizations/SetsRelationDigraph";
import SetsCartesianGrid from "./visualizations/SetsCartesianGrid";
import DefintAreaRegion from "./visualizations/DefintAreaRegion";
import DefintKingsReflection from "./visualizations/DefintKingsReflection";
import DefintGreatestIntegerArea from "./visualizations/DefintGreatestIntegerArea";
import DefintAbsoluteValueFold from "./visualizations/DefintAbsoluteValueFold";
import DefeqFamilyOfCurves from "./visualizations/DefeqFamilyOfCurves";
import DefeqGrowthDecay from "./visualizations/DefeqGrowthDecay";
import QeDiscriminantParabola from "./visualizations/QeDiscriminantParabola";
import QeRootsInInterval from "./visualizations/QeRootsInInterval";
import BtPascalTriangle from "./visualizations/BtPascalTriangle";
import PtTriangleLabeled from "./visualizations/PtTriangleLabeled";
import PtCircumIncircle from "./visualizations/PtCircumIncircle";
import ConicsParabolaDiagram from "./visualizations/ConicsParabolaDiagram";
import ConicsEllipseDiagram from "./visualizations/ConicsEllipseDiagram";
import ItPrincipalRanges from "./visualizations/ItPrincipalRanges";
import TeSolutionCounting from "./visualizations/TeSolutionCounting";
import CircCircleAnatomy from "./visualizations/CircCircleAnatomy";
import CircInscribedAngle from "./visualizations/CircInscribedAngle";
import AoiAreaUnderCurveRegion from "./visualizations/AoiAreaUnderCurveRegion";
import AoiAreaBetweenCurvesRegion from "./visualizations/AoiAreaBetweenCurvesRegion";
import HdElevationTriangle from "./visualizations/HdElevationTriangle";
import HdShadowSun from "./visualizations/HdShadowSun";
import CellFluidMosaicMembrane from "./visualizations/CellFluidMosaicMembrane";
import CellAnimalPlantStructure from "./visualizations/CellAnimalPlantStructure";
import CellOrganelleMap from "./visualizations/CellOrganelleMap";
import CellProkaryoteEukaryote from "./visualizations/CellProkaryoteEukaryote";
import CellOsmosisTonicity from "./visualizations/CellOsmosisTonicity";
import PlantPhotosynthesisFlow from "./visualizations/PlantPhotosynthesisFlow";
import PlantTropismBending from "./visualizations/PlantTropismBending";
import PlantSeedParts from "./visualizations/PlantSeedParts";
import MicroPathogenTree from "./visualizations/MicroPathogenTree";
import MicroMalariaCycle from "./visualizations/MicroMalariaCycle";
import ReproFlowerStructure from "./visualizations/ReproFlowerStructure";
import ReproDoubleFertilisation from "./visualizations/ReproDoubleFertilisation";
import EcoFoodChainPyramid from "./visualizations/EcoFoodChainPyramid";
import BiodivFiveKingdoms from "./visualizations/BiodivFiveKingdoms";
import BiodivPlantProgression from "./visualizations/BiodivPlantProgression";
import GenDnaBasePairing from "./visualizations/GenDnaBasePairing";
import BiochemProteinStructureLevels from "./visualizations/BiochemProteinStructureLevels";
import EslEarthInteriorLayers from "./visualizations/EslEarthInteriorLayers";
import EslPlateBoundaryTypes from "./visualizations/EslPlateBoundaryTypes";
import EslEarthquakeFocusEpicentre from "./visualizations/EslEarthquakeFocusEpicentre";
import EslSeismicWaveTypes from "./visualizations/EslSeismicWaveTypes";
import EslSeismicShadowZones from "./visualizations/EslSeismicShadowZones";
import EslVolcanoTypes from "./visualizations/EslVolcanoTypes";
import EslRockCycle from "./visualizations/EslRockCycle";
import EslFluvialLandforms from "./visualizations/EslFluvialLandforms";
import IgeCroppingCalendar from "./visualizations/IgeCroppingCalendar";
import IgpPhysiographicCrossSection from "./visualizations/IgpPhysiographicCrossSection";
import IgpHimalayanRanges from "./visualizations/IgpHimalayanRanges";
import IgpIndiaExtent from "./visualizations/IgpIndiaExtent";
import ClimAtmosphereLayers from "./visualizations/ClimAtmosphereLayers";
import ClimPressureBeltsWinds from "./visualizations/ClimPressureBeltsWinds";
import ClimTropicalCycloneStructure from "./visualizations/ClimTropicalCycloneStructure";
import ClimWarmColdFront from "./visualizations/ClimWarmColdFront";
import WhgCanalsMap from "./visualizations/WhgCanalsMap";
import EisLatLongGrid from "./visualizations/EisLatLongGrid";
import EisRotationRevolution from "./visualizations/EisRotationRevolution";
import EisSolarSystemOrder from "./visualizations/EisSolarSystemOrder";
import EisTimeZonesIdl from "./visualizations/EisTimeZonesIdl";
import OcnSeaFloorProfile from "./visualizations/OcnSeaFloorProfile";
import OcnSpringNeapTides from "./visualizations/OcnSpringNeapTides";
import OcnCoralReefTypes from "./visualizations/OcnCoralReefTypes";
import CdsUnitDigitCycleWheel from "./visualizations/CdsUnitDigitCycleWheel";
import CdsTrigRightTriangle from "./visualizations/CdsTrigRightTriangle";
import CdsTouchingCircles from "./visualizations/CdsTouchingCircles";
import CdsConeAnatomy from "./visualizations/CdsConeAnatomy";
import CdsAltitudeHypotenuse from "./visualizations/CdsAltitudeHypotenuse";
import CdsRationalIrrationalLine from "./visualizations/CdsRationalIrrationalLine";
import RatioBarModel from "./visualizations/RatioBarModel";
import AfConeCut from "./visualizations/AfConeCut";
import AfCuboidDiagonal from "./visualizations/AfCuboidDiagonal";
import AfSquareInCircle from "./visualizations/AfSquareInCircle";
import AfPathAroundLawn from "./visualizations/AfPathAroundLawn";
import AfTwoSightings from "./visualizations/AfTwoSightings";
import AfAngleOfDepression from "./visualizations/AfAngleOfDepression";
import AfOgiveMedian from "./visualizations/AfOgiveMedian";
import AfDiceSumGrid from "./visualizations/AfDiceSumGrid";
import AfClockMirror from "./visualizations/AfClockMirror";
import AfClockAngle from "./visualizations/AfClockAngle";
import AfAlligationCross from "./visualizations/AfAlligationCross";
import AfCircularTrack from "./visualizations/AfCircularTrack";
import AfTrainPlatform from "./visualizations/AfTrainPlatform";
import AfAreaChange from "./visualizations/AfAreaChange";
import LogicSwitchSeriesParallel from "./visualizations/LogicSwitchSeriesParallel";
import LogicCircuitSimplification from "./visualizations/LogicCircuitSimplification";
import type { VisualizationSlug } from "@/app/notes/_types";
import { featuredLeadIn } from "@/lib/notes/countKind";

export function renderVisualization(slug: VisualizationSlug) {
  switch (slug) {
    case "regression-line-fit":
      return <RegressionLineFit />;
    case "variance-squared-deviations":
      return <VarianceSquaredDeviations />;
    case "histogram-bin-slider":
      return <HistogramBinSlider />;
    case "vector-addition":
      return <VectorAddition />;
    case "vector-projection":
      return <VectorProjection />;
    case "cross-product-area":
      return <CrossProductArea />;
    case "dice-sum-grid":
      return <DiceSumGrid />;
    case "venn-two-events":
      return <VennTwoEvents />;
    case "probability-tree":
      return <ProbabilityTree />;
    case "skew-mean-median-mode":
      return <SkewMeanMedianMode />;
    case "pie-chart-sectors":
      return <PieChartSectors />;
    case "correlation-scatter":
      return <CorrelationScatter />;
    case "right-hand-rule-cross":
      return <RightHandRuleCrossProduct3D />;
    case "unit-normal-vector":
      return <UnitNormalVector3D />;
    case "direction-cosines":
      return <DirectionCosines3D />;
    case "triple-product-box":
      return <TripleProductBoxSvg />;
    case "section-formula":
      return <SectionFormula />;
    case "triangle-centroid":
      return <TriangleCentroid />;
    case "parallelogram-diagonals":
      return <ParallelogramDiagonals />;
    case "exclusive-vs-independent":
      return <ExclusiveVsIndependent />;
    case "conditional-restrict":
      return <ConditionalRestrict />;
    case "set-operations-venn":
      return <SetOperationsVenn />;
    case "median-middle-value":
      return <MedianMiddleValue />;
    case "mode-bar-plot":
      return <ModeBarPlot />;
    case "mean-balance-point":
      return <MeanBalancePoint />;
    case "mean-deviation-spread":
      return <MeanDeviationSpread />;
    case "identify-regression-line":
      return <IdentifyRegressionLine />;
    case "angle-between-regression-lines":
      return <AngleBetweenRegressionLines />;
    case "component-form-basis":
      return <ComponentFormBasis3D />;
    case "orthonormal-triple":
      return <OrthogonalTriple3D />;
    case "torque-moment":
      return <TorqueMoment3D />;
    case "position-displacement":
      return <PositionDisplacementVectors />;
    case "magnitude-right-triangle":
      return <MagnitudeRightTriangle />;
    case "scalar-multiply":
      return <ScalarMultiplication />;
    case "dot-product-work":
      return <DotProductWork />;
    case "sample-space-event":
      return <SampleSpaceEvent />;
    case "coin-toss-tree":
      return <CoinTossTree />;
    case "neither-complement-union":
      return <NeitherComplementUnion />;
    case "exhaustive-events-tiling":
      return <ExhaustiveEvents />;
    case "compression-rarefaction-wave":
      return <CompressionRarefactionWave />;
    case "beats-envelope":
      return <BeatsEnvelope />;
    case "ear-anatomy":
      return <EarAnatomy />;
    case "frequency-spectrum-strip":
      return <FrequencySpectrumStrip />;
    case "echo-geometry":
      return <EchoGeometry />;
    case "antiderivative-family":
      return <AntiderivativeFamily />;
    case "octants-coordinate-planes":
      return <OctantsCoordinatePlanes />;
    case "line-plane-intersection":
      return <LinePlaneIntersection />;
    case "plane-with-normal":
      return <PlaneWithNormal />;
    case "sphere-plane-tangency":
      return <SpherePlaneTangency />;
    case "angle-between-lines-3d":
      return <AngleBetweenLines3D />;
    case "sphere-centre-radius-3d":
      return <SphereCentreRadius3D />;
    case "determinant-as-area":
      return <DeterminantAsArea />;
    case "cofactor-sign-grid":
      return <CofactorSignGrid />;
    case "sarrus-rule":
      return <SarrusRule />;
    case "field-lines-charge":
      return <FieldLinesCharge />;
    case "iv-characteristic-graph":
      return <IVCharacteristicGraph />;
    case "resistance-wire-geometry":
      return <ResistanceWireGeometry />;
    case "resistors-series-parallel":
      return <ResistorsSeriesParallel />;
    case "emf-internal-resistance":
      return <EmfInternalResistance />;
    case "magnetic-field-around-wire":
      return <MagneticFieldAroundWire />;
    case "flemings-left-hand-rule":
      return <FlemingsLeftHandRule />;
    case "magnetic-force-triad":
      return <MagneticForceTriad />;
    case "bar-magnet-field-lines":
      return <BarMagnetFieldLines />;
    case "solenoid-field-lines":
      return <SolenoidFieldLines />;
    case "am-gm-hm-means":
      return <AmGmHmMeans />;
    case "binomial-pmf-interactive":
      return <BinomialPmfInteractive />;
    case "binomial-coefficient-tree":
      return <BinomialCoefficientTree />;
    case "binomial-tail-shading":
      return <BinomialTailShading />;
    case "binomial-mean-spread":
      return <BinomialMeanSpread />;
    case "function-mapping-diagram":
      return <FunctionMappingDiagram />;
    case "function-domain-range-graph":
      return <DomainRangeGraph />;
    case "even-odd-symmetry":
      return <EvenOddSymmetry />;
    case "composition-machine":
      return <CompositionMachine />;
    case "inverse-reflection-line":
      return <InverseReflectionLine />;
    case "greatest-integer-staircase":
      return <GreatestIntegerStaircase />;
    case "diff-tangent-slope":
      return <DiffTangentSlope />;
    case "diff-modulus-corner":
      return <DiffModulusCorner />;
    case "diff-piecewise-join":
      return <DiffPiecewiseJoin />;
    case "trig-astc-quadrants":
      return <TrigAstcQuadrants />;
    case "trig-amplitude-phase":
      return <TrigAmplitudePhase />;
    case "lim-discontinuity-types":
      return <LimDiscontinuityTypes />;
    case "lim-one-sided-approach":
      return <LimOneSidedApproach />;
    case "aod-sign-of-derivative":
      return <AodSignOfDerivative />;
    case "aod-extrema-curve":
      return <AodExtremaCurve />;
    case "lines-angle-between-diagram":
      return <LinesAngleBetween />;
    case "lines-distance-point-line":
      return <LinesDistancePointLine />;
    case "pc-geometric-counting-diagram":
      return <PcGeometricCounting />;
    case "cn-argand-plane":
      return <CnArgandPlane />;
    case "cn-cube-roots-circle":
      return <CnCubeRootsCircle />;
    case "hp-heart-chambers":
      return <HpHeartChambers />;
    case "hp-eye-cross-section":
      return <HpEyeCrossSection />;
    case "hp-nephron-schematic":
      return <HpNephronSchematic />;
    case "hp-reflex-arc":
      return <HpReflexArc />;
    case "hp-lung-volumes":
      return <HpLungVolumes />;
    case "hp-alveolus-gas-exchange":
      return <HpAlveolusGasExchange />;
    case "carb-allotrope-structures":
      return <CarbAllotropeStructures />;
    case "atom-bohr-shells":
      return <AtomBohrShells />;
    case "atom-periodic-trends":
      return <AtomPeriodicTrends />;
    case "matt-states-of-matter":
      return <MattStatesOfMatter />;
    case "carb-micelle":
      return <CarbMicelle />;
    case "carb-functional-groups":
      return <CarbFunctionalGroups />;
    case "acid-ph-scale-strip":
      return <AcidPhScaleStrip />;
    case "matt-distillation-apparatus":
      return <MattDistillationApparatus />;
    case "matt-colloid-tyndall":
      return <MattColloidTyndall />;
    case "bond-ionic-covalent-formation":
      return <BondIonicCovalentFormation />;
    case "hyd-water-hydrogen-bonding":
      return <HydWaterHydrogenBonding />;
    case "rxn-reaction-types":
      return <RxnReactionTypes />;
    case "opt-concave-mirror-rays":
      return <OptConcaveMirrorRays />;
    case "opt-convex-mirror-rays":
      return <OptConvexMirrorRays />;
    case "opt-refraction-tir":
      return <OptRefractionTIR />;
    case "opt-convex-lens-rays":
      return <OptConvexLensRays />;
    case "opt-prism-dispersion":
      return <OptPrismDispersion />;
    case "opt-human-eye":
      return <OptHumanEye />;
    case "lmf-free-body-diagram":
      return <LmfFreeBodyDiagram />;
    case "lmf-action-reaction-pair":
      return <LmfActionReactionPair />;
    case "lmf-resultant-parallelogram":
      return <LmfResultantParallelogram />;
    case "lmf-friction-incline":
      return <LmfFrictionIncline />;
    case "ht-heat-transfer-modes":
      return <HtHeatTransferModes />;
    case "ht-pv-process-diagram":
      return <HtPvProcessDiagram />;
    case "ht-anomalous-water-expansion":
      return <HtAnomalousWaterExpansion />;
    case "mp-photoelectric-setup":
      return <PhotoelectricSetup />;
    case "mp-bohr-energy-levels":
      return <BohrEnergyLevels />;
    case "mp-radiation-penetration":
      return <RadiationPenetration />;
    case "kin-velocity-time-graph":
      return <KinVelocityTimeGraph />;
    case "kin-position-time-graph":
      return <KinPositionTimeGraph />;
    case "kin-projectile-parabola":
      return <KinProjectileParabola />;
    case "fluid-pressure-depth":
      return <FluidPressureDepth />;
    case "surface-tension-meniscus":
      return <SurfaceTensionMeniscus />;
    case "archimedes-floating-block":
      return <ArchimedesFloatingBlock />;
    case "pascal-hydraulic-press":
      return <PascalHydraulicPress />;
    case "wep-work-at-angle":
      return <WepWorkAtAngle />;
    case "wep-energy-conservation-track":
      return <WepEnergyConservationTrack />;
    case "grav-kepler-orbit":
      return <GravKeplerOrbit />;
    case "grav-composite-sphere":
      return <GravCompositeSphere />;
    case "grav-field-vs-potential":
      return <GravFieldVsPotential />;
    case "umd-least-count-ruler":
      return <UmdLeastCountRuler />;
    case "osc-shm-displacement-time":
      return <OscShmDisplacementTime />;
    case "osc-pendulum-restoring-force":
      return <OscPendulumRestoringForce />;
    case "osc-wave-types":
      return <OscWaveTypes />;
    case "sets-venn-two":
      return <SetsVennTwo />;
    case "sets-venn-three":
      return <SetsVennThree />;
    case "sets-relation-digraph":
      return <SetsRelationDigraph />;
    case "sets-cartesian-grid":
      return <SetsCartesianGrid />;
    case "defint-area-region":
      return <DefintAreaRegion />;
    case "defint-kings-reflection":
      return <DefintKingsReflection />;
    case "defint-greatest-integer-area":
      return <DefintGreatestIntegerArea />;
    case "defint-absolute-value-fold":
      return <DefintAbsoluteValueFold />;
    case "defeq-family-of-curves":
      return <DefeqFamilyOfCurves />;
    case "defeq-growth-decay":
      return <DefeqGrowthDecay />;
    case "qe-discriminant-parabola":
      return <QeDiscriminantParabola />;
    case "qe-roots-in-interval":
      return <QeRootsInInterval />;
    case "bt-pascal-triangle":
      return <BtPascalTriangle />;
    case "pt-triangle-labeled":
      return <PtTriangleLabeled />;
    case "pt-circumcircle-incircle":
      return <PtCircumIncircle />;
    case "conics-parabola-diagram":
      return <ConicsParabolaDiagram />;
    case "conics-ellipse-diagram":
      return <ConicsEllipseDiagram />;
    case "it-principal-ranges":
      return <ItPrincipalRanges />;
    case "te-solution-counting":
      return <TeSolutionCounting />;
    case "circ-circle-anatomy":
      return <CircCircleAnatomy />;
    case "circ-inscribed-angle":
      return <CircInscribedAngle />;
    case "aoi-area-under-curve-region":
      return <AoiAreaUnderCurveRegion />;
    case "aoi-area-between-curves-region":
      return <AoiAreaBetweenCurvesRegion />;
    case "hd-elevation-triangle":
      return <HdElevationTriangle />;
    case "hd-shadow-sun":
      return <HdShadowSun />;
    case "cell-fluid-mosaic-membrane":
      return <CellFluidMosaicMembrane />;
    case "cell-animal-plant-structure":
      return <CellAnimalPlantStructure />;
    case "cell-organelle-map":
      return <CellOrganelleMap />;
    case "cell-prokaryote-eukaryote":
      return <CellProkaryoteEukaryote />;
    case "cell-osmosis-tonicity":
      return <CellOsmosisTonicity />;
    case "plant-photosynthesis-flow":
      return <PlantPhotosynthesisFlow />;
    case "plant-tropism-bending":
      return <PlantTropismBending />;
    case "plant-seed-parts":
      return <PlantSeedParts />;
    case "micro-pathogen-tree":
      return <MicroPathogenTree />;
    case "micro-malaria-cycle":
      return <MicroMalariaCycle />;
    case "repro-flower-structure":
      return <ReproFlowerStructure />;
    case "repro-double-fertilisation":
      return <ReproDoubleFertilisation />;
    case "eco-food-chain-pyramid":
      return <EcoFoodChainPyramid />;
    case "biodiv-five-kingdoms":
      return <BiodivFiveKingdoms />;
    case "biodiv-plant-progression":
      return <BiodivPlantProgression />;
    case "gen-dna-base-pairing":
      return <GenDnaBasePairing />;
    case "biochem-protein-structure-levels":
      return <BiochemProteinStructureLevels />;
    case "esl-earth-interior-layers":
      return <EslEarthInteriorLayers />;
    case "esl-plate-boundary-types":
      return <EslPlateBoundaryTypes />;
    case "esl-earthquake-focus-epicentre":
      return <EslEarthquakeFocusEpicentre />;
    case "esl-seismic-wave-types":
      return <EslSeismicWaveTypes />;
    case "esl-seismic-shadow-zones":
      return <EslSeismicShadowZones />;
    case "esl-volcano-types":
      return <EslVolcanoTypes />;
    case "esl-rock-cycle":
      return <EslRockCycle />;
    case "esl-fluvial-landforms":
      return <EslFluvialLandforms />;
    case "ige-cropping-calendar":
      return <IgeCroppingCalendar />;
    case "igp-physiographic-cross-section":
      return <IgpPhysiographicCrossSection />;
    case "igp-himalayan-ranges":
      return <IgpHimalayanRanges />;
    case "igp-india-extent":
      return <IgpIndiaExtent />;
    case "clim-atmosphere-layers":
      return <ClimAtmosphereLayers />;
    case "clim-pressure-belts-winds":
      return <ClimPressureBeltsWinds />;
    case "clim-tropical-cyclone-structure":
      return <ClimTropicalCycloneStructure />;
    case "clim-warm-cold-front":
      return <ClimWarmColdFront />;
    case "whg-canals-map":
      return <WhgCanalsMap />;
    case "eis-lat-long-grid":
      return <EisLatLongGrid />;
    case "eis-rotation-revolution":
      return <EisRotationRevolution />;
    case "eis-solar-system-order":
      return <EisSolarSystemOrder />;
    case "eis-time-zones-idl":
      return <EisTimeZonesIdl />;
    case "ocn-seafloor-profile":
      return <OcnSeaFloorProfile />;
    case "ocn-spring-neap-tides":
      return <OcnSpringNeapTides />;
    case "ocn-coral-reef-types":
      return <OcnCoralReefTypes />;
    case "cds-trig-right-triangle":
      return <CdsTrigRightTriangle />;
    case "cds-touching-circles":
      return <CdsTouchingCircles />;
    case "cds-altitude-hypotenuse":
      return <CdsAltitudeHypotenuse />;
    case "cds-cone-anatomy":
      return <CdsConeAnatomy />;
    case "cds-unit-digit-cycle-wheel":
      return <CdsUnitDigitCycleWheel />;
    case "cds-rational-irrational-line":
      return <CdsRationalIrrationalLine />;
    case "ratio-bar-model":
      return <RatioBarModel />;
    case "af-cone-cut":
      return <AfConeCut />;
    case "af-cuboid-diagonal":
      return <AfCuboidDiagonal />;
    case "af-square-in-circle":
      return <AfSquareInCircle />;
    case "af-path-around-lawn":
      return <AfPathAroundLawn />;
    case "af-two-sightings":
      return <AfTwoSightings />;
    case "af-angle-of-depression":
      return <AfAngleOfDepression />;
    case "af-ogive-median":
      return <AfOgiveMedian />;
    case "af-dice-sum-grid":
      return <AfDiceSumGrid />;
    case "af-clock-mirror":
      return <AfClockMirror />;
    case "af-clock-angle":
      return <AfClockAngle />;
    case "af-alligation-cross":
      return <AfAlligationCross />;
    case "af-circular-track":
      return <AfCircularTrack />;
    case "af-train-platform":
      return <AfTrainPlatform />;
    case "af-area-change":
      return <AfAreaChange />;
    case "logic-switch-series-parallel":
      return <LogicSwitchSeriesParallel />;
    case "logic-circuit-simplification":
      return <LogicCircuitSimplification />;
    case "imat-chart-types":
      return <ImatChartTypes />;
    case "ssc-income-aggregates":
      return <SscIncomeAggregates />;
    case "ssc-plan-timeline":
      return <SscPlanTimeline />;
    case "ssc-budget-deficits":
      return <SscBudgetDeficits />;
    case "ssc-elasticity-scale":
      return <SscElasticityScale />;
    case "ssc-periodic-groups":
      return <SscPeriodicGroups />;
    case "ssc-hydrocarbon-families":
      return <SscHydrocarbonFamilies />;
    case "ssc-redox-numbers":
      return <SscRedoxNumbers />;
    case "ssc-milk-ph":
      return <SscMilkPh />;
    case "ssc-mass-percent":
      return <SscMassPercent />;
    case "ssc-valency-cross":
      return <SscValencyCross />;
    case "ssc-satellite-orbits":
      return <SscSatelliteOrbits />;
    case "ssc-vernier-parts":
      return <SscVernierParts />;
    case "ssc-matka-cooling":
      return <SscMatkaCooling />;
    case "ssc-rigid-rotation":
      return <SscRigidRotation />;
    case "jee-carbocation-shift":
      return <JeeCarbocationShift />;
    case "jee-diborane-borazine":
      return <JeeDiboraneBorazine />;
    case "jee-spin-only-moment":
      return <JeeSpinOnlyMoment />;
    case "jee-phenoxide-resonance":
      return <JeePhenoxideResonance />;
    case "jee-amine-basicity":
      return <JeeAmineBasicity />;
    case "neet-xenon-shapes":
      return <NeetXenonShapes />;
    case "neet-lanthanoid-contraction":
      return <NeetLanthanoidContraction />;
    case "neet-amine-basicity":
      return <NeetAmineBasicity />;
    case "neet-limiting-reagent":
      return <NeetLimitingReagent />;
    case "neet-redox-balance":
      return <NeetRedoxBalance />;
    case "neet-phenol-acidity":
      return <NeetPhenolAcidity />;
    case "ssc-plant-groups":
      return <SscPlantGroups />;
    case "ssc-blood-flow":
      return <SscBloodFlow />;
    case "ssc-bacterial-shapes":
      return <SscBacterialShapes />;
    case "neet-coelom-types":
      return <NeetCoelomTypes />;
    case "neet-simple-epithelium":
      return <NeetSimpleEpithelium />;
    case "neet-hormone-action":
      return <NeetHormoneAction />;
    case "neet-plasmodium-cycle":
      return <NeetPlasmodiumCycle />;
    case "neet-art-transfers":
      return <NeetArtTransfers />;
    case "neet-bt-toxin":
      return <NeetBtToxin />;
    case "cet-mole-chain":
      return <CetMoleChain />;
    case "cet-nitrophenol-h-bonds":
      return <CetNitrophenolHBonds />;
    case "cet-amine-nh-tests":
      return <CetAmineNHTests />;
    case "cet-spin-only-moment":
      return <CetSpinOnlyMoment />;
    case "cet-xenon-shapes":
      return <CetXenonShapes />;
    case "cet-oxidation-ladder":
      return <CetOxidationLadder />;
    case "cet-freundlich-plots":
      return <CetFreundlichPlots />;
    case "cet-solvay-loop":
      return <CetSolvayLoop />;
    case "cet-pentane-carbon-types":
      return <CetPentaneCarbonTypes />;
    case "cet-nano-dimensions":
      return <CetNanoDimensions />;
    case "cet-alkyne-reduction":
      return <CetAlkyneReduction />;
    case "jee-matrix-row-column":
      return <JeeMatrixRowColumn />;
    case "jee-two-lines-parameter":
      return <JeeTwoLinesParameter />;
    case "jee-implication-false-rows":
      return <JeeImplicationFalseRows />;
    case "jee-repeated-parts":
      return <JeeRepeatedParts />;
    case "ssc-pipes-net-fill":
      return <SscPipesNetFill />;
    case "ssc-square-of-sum":
      return <SscSquareOfSum />;
    case "ssc-nested-brackets":
      return <SscNestedBrackets />;
    case "ssc-ci-vs-si":
      return <SscCiVsSi />;
    case "ssc-lines-solution-count":
      return <SscLinesSolutionCount />;
    case "ssc-trapezium-diagonals":
      return <SscTrapeziumDiagonals />;
    case "cet-wien-peak":
      return <CetWienPeak />;
    case "cet-g-height-depth":
      return <CetGHeightDepth />;
    case "cet-hysteresis-loop":
      return <CetHysteresisLoop />;
    case "cet-errors-add":
      return <CetErrorsAdd />;
    case "cet-cut-spring":
      return <CetCutSpring />;
    case "jee-heating-curve":
      return <JeeHeatingCurve />;
    case "jee-am-envelope":
      return <JeeAmEnvelope />;
    case "neet-em-wave-fields":
      return <NeetEmWaveFields />;
    case "ssc-t2-series-block":
      return <SscT2SeriesBlock />;
    case "ssc-t2-sign-rewrite":
      return <SscT2SignRewrite />;
    case "ssc-t2-ds-row":
      return <SscT2DsRow />;
    case "ssc-t2-coded-relations":
      return <SscT2CodedRelations />;
    case "ssc-t2-shared-code":
      return <SscT2SharedCode />;
    case "ssc-t2-letter-steps":
      return <SscT2LetterSteps />;
    case "ssc-t2-odd-pair":
      return <SscT2OddPair />;
    case "ssc-t2-digits-in-place":
      return <SscT2DigitsInPlace />;
    case "ssc-t2-cause-links":
      return <SscT2CauseLinks />;
    case "ssc-t2-figure-series":
      return <SscT2FigureSeries />;
    case "ssc-t2-segment-digits":
      return <SscT2SegmentDigits />;
    case "ssc-t2-memory-ladder":
      return <SscT2MemoryLadder />;
    case "ssc-t2-excel-range":
      return <SscT2ExcelRange />;
    case "ssc-t2-upload-download":
      return <SscT2UploadDownload />;
    case "ssc-t2-software-layers":
      return <SscT2SoftwareLayers />;
    case "ssc-t2-security-tools":
      return <SscT2SecurityTools />;
    case "ssc-t2-hub-switch":
      return <SscT2HubSwitch />;
    case "neet-taxon-hierarchy":
      return <NeetTaxonHierarchy />;
    case "neet-life-cycle-patterns":
      return <NeetLifeCyclePatterns />;
    case "neet-cambium-ring":
      return <NeetCambiumRing />;
    case "neet-growth-curves":
      return <NeetGrowthCurves />;
    case "neet-dihybrid-cross":
      return <NeetDihybridCross />;
    case "neet-brewed-drinks":
      return <NeetBrewedDrinks />;
    case "neet-species-area":
      return <NeetSpeciesArea />;
    case "ssc-t2-milk-replacement":
      return <SscT2MilkReplacement />;
    case "ssc-t2-angle-bisector":
      return <SscT2AngleBisector />;
    case "ssc-t2-square-of-sum":
      return <SscT2SquareOfSum />;
    case "ssc-t2-ci-minus-si":
      return <SscT2CiMinusSi />;
    case "ssc-t2-work-units":
      return <SscT2WorkUnits />;
    case "ssc-t2-combined-average":
      return <SscT2CombinedAverage />;
    case "ssc-t2-pair-of-lines":
      return <SscT2PairOfLines />;
    case "ssc-t2-chord-distance":
      return <SscT2ChordDistance />;
    case "ssc-t2-trapezium":
      return <SscT2Trapezium />;
    case "ssc-row-rule-grid":
      return <SscRowRuleGrid />;
    case "ssc-week-wheel":
      return <SscWeekWheel />;
    case "ssc-bodmas-row":
      return <SscBodmasRow />;
    case "ssc-opposite-letters":
      return <SscOppositeLetters />;
    case "ssc-alphabet-positions":
      return <SscAlphabetPositions />;
    case "ssc-difference-ladder":
      return <SscDifferenceLadder />;
    case "ssc-turning-arrow":
      return <SscTurningArrow />;
    case "ssc-grid-squares":
      return <SscGridSquares />;
    case "ssc-inequality-chain":
      return <SscInequalityChain />;
    case "ssc-symmetry-quarters":
      return <SscSymmetryQuarters />;
    case "ssc-sound-media":
      return <SscSoundMedia />;
    case "ssc-respiration-stages":
      return <SscRespirationStages />;
    case "ssc-decay-modes":
      return <SscDecayModes />;
    case "ssc-leaf-venation":
      return <SscLeafVenation />;
    case "ssc-rainfall-types":
      return <SscRainfallTypes />;
    case "ssc-stomata-transpiration":
      return <SscStomataTranspiration />;
    case "ssc-demographic-transition":
      return <SscDemographicTransition />;
    case "ssc-glacial-karst-landforms":
      return <SscGlacialKarstLandforms />;
    case "ssc-mirror-water-image":
      return <SscMirrorWaterImage />;
    case "ssc-family-tree":
      return <SscFamilyTree />;
    case "ssc-medians-centroid":
      return <SscMediansCentroid />;
    case "ssc-tower-two-observers":
      return <SscTowerTwoObservers />;
    case "ssc-cylinder-net":
      return <SscCylinderNet />;
    case "ssc-sphere-in-cylinder":
      return <SscSphereInCylinder />;
    case "ssc-alligation-cross":
      return <SscAlligationCross />;
    case "ssc-boats-streams":
      return <SscBoatsStreams />;
    case "neet-countercurrent":
      return <NeetCountercurrent />;
    case "neet-cardiac-conduction":
      return <NeetCardiacConduction />;
    case "neet-menstrual-cycle":
      return <NeetMenstrualCycle />;
    case "neet-neuron-structure":
      return <NeetNeuronStructure />;
    case "neet-meiosis-prophase":
      return <NeetMeiosisProphase />;
    case "neet-thylakoid-chemiosmosis":
      return <NeetThylakoidChemiosmosis />;
    case "neet-prism-deviation":
      return <NeetPrismDeviation />;
    case "neet-equipotentials":
      return <NeetEquipotentials />;
    case "neet-capacitor-dielectric":
      return <NeetCapacitorDielectric />;
    case "neet-ethane-conformations":
      return <NeetEthaneConformations />;
    case "neet-carbocation-stability":
      return <NeetCarbocationStability />;
    case "neet-chem-pv-work":
      return <NeetChemPvWork />;
    case "neet-z-scheme":
      return <NeetZScheme />;
    case "neet-calvin-cycle":
      return <NeetCalvinCycle />;
    case "neet-kranz-anatomy":
      return <NeetKranzAnatomy />;
    case "neet-respiration-pathway":
      return <NeetRespirationPathway />;
    case "neet-lac-operon":
      return <NeetLacOperon />;
    case "neet-embryo-sac":
      return <NeetEmbryoSac />;
    case "jee-point-image-line":
      return <JeePointImageLine />;
    case "jee-chord-length":
      return <JeeChordLength />;
    case "jee-two-circles":
      return <JeeTwoCircles />;
    case "jee-hyperbola-focal":
      return <JeeHyperbolaFocal />;
    case "jee-ellipse-focal":
      return <JeeEllipseFocal />;
    case "jee-skew-lines-distance":
      return <JeeSkewLinesDistance />;
    case "jee-complex-rotation":
      return <JeeComplexRotation />;
    case "jee-mean-value-theorem":
      return <JeeMeanValueTheorem />;
    case "jee-riemann-sum":
      return <JeeRiemannSum />;
    case "jee-crystal-field-splitting":
      return <JeeCrystalFieldSplitting />;
    case "jee-mo-diagram":
      return <JeeMoDiagram />;
    case "jee-raoult-deviations":
      return <JeeRaoultDeviations />;
    case "jee-reaction-order-plots":
      return <JeeReactionOrderPlots />;
    case "jee-arrhenius-plot":
      return <JeeArrheniusPlot />;
    case "jee-radial-probability":
      return <JeeRadialProbability />;
    case "jee-born-haber":
      return <JeeBornHaber />;
    case "jee-complex-isomers":
      return <JeeComplexIsomers />;
    case "jee-moving-rod-emf":
      return <JeeMovingRodEmf />;
    case "jee-malus-polaroids":
      return <JeeMalusPolaroids />;
    case "jee-gauss-field-graphs":
      return <JeeGaussFieldGraphs />;
    case "jee-terminal-velocity":
      return <JeeTerminalVelocity />;
    case "jee-wheatstone-bridge":
      return <JeeWheatstoneBridge />;
    case "jee-vernier-scale":
      return <JeeVernierScale />;
    case "jee-logic-gate-switches":
      return <JeeLogicGateSwitches />;
    case "jee-magnetic-dipole-torque":
      return <JeeMagneticDipoleTorque />;
    case "jee-apparent-depth":
      return <JeeApparentDepth />;
    case "jee-pv-work-area":
      return <JeePvWorkArea />;
    case "jee-force-displacement-area":
      return <JeeForceDisplacementArea />;
    case "jee-stress-strain":
      return <JeeStressStrain />;
    case "jee-parallel-axis":
      return <JeeParallelAxis />;
    case "jee-shm-energy-graphs":
      return <JeeShmEnergyGraphs />;
    case "jee-prism-min-deviation":
      return <JeePrismMinDeviation />;
    case "jee-binding-energy-curve":
      return <JeeBindingEnergyCurve />;
    case "jee-maxwell-speeds":
      return <JeeMaxwellSpeeds />;
    case "cet-lpp-corner-points":
      return <CetLppCornerPoints />;
    case "cet-lpp-half-plane":
      return <CetLppHalfPlane />;
    case "cet-pair-of-lines-angle":
      return <CetPairOfLinesAngle />;
    case "cet-unit-circle-solutions":
      return <CetUnitCircleSolutions />;
    case "cet-argand-rotation":
      return <CetArgandRotation />;
    case "cet-modulus-circle":
      return <CetModulusCircle />;
    case "cet-de-solution-family":
      return <CetDeSolutionFamily />;
    case "cet-cooling-curve":
      return <CetCoolingCurve />;
    case "cet-sn1-vs-sn2":
      return <CetSn1VsSn2 />;
    case "cet-eas-mechanism":
      return <CetEasMechanism />;
    case "cet-directing-effects":
      return <CetDirectingEffects />;
    case "cet-carbonyl-addition":
      return <CetCarbonylAddition />;
    case "cet-saytzeff-elimination":
      return <CetSaytzeffElimination />;
    case "cet-chain-growth":
      return <CetChainGrowth />;
    case "cet-unit-cell-counting":
      return <CetUnitCellCounting />;
    case "cet-tetra-octa-voids":
      return <CetTetraOctaVoids />;
    case "cet-edge-length-radius":
      return <CetEdgeLengthRadius />;
    case "cet-d-electron-pairing":
      return <CetDElectronPairing />;
    case "cet-glucose-ring-closure":
      return <CetGlucoseRingClosure />;
    case "cet-dna-base-pairing":
      return <CetDnaBasePairing />;
    case "cet-hess-cycle":
      return <CetHessCycle />;
    case "cet-gibbs-sign":
      return <CetGibbsSign />;
    case "cet-raoult-two-liquids":
      return <CetRaoultTwoLiquids />;
    case "cet-molar-conductivity-dilution":
      return <CetMolarConductivityDilution />;
    case "cet-first-order-plot":
      return <CetFirstOrderPlot />;
    case "cet-boiling-point-elevation":
      return <CetBoilingPointElevation />;
    case "cet-pn-depletion":
      return <CetPnDepletion />;
    case "cet-diode-bias":
      return <CetDiodeBias />;
    case "cet-rectifier-waves":
      return <CetRectifierWaves />;
    case "cet-photoelectric-threshold":
      return <CetPhotoelectricThreshold />;
    case "cet-photoelectric-graphs":
      return <CetPhotoelectricGraphs />;
    case "cet-hydrogen-series":
      return <CetHydrogenSeries />;
    case "cet-standing-wave-modes":
      return <CetStandingWaveModes />;
    case "cet-pipe-modes":
      return <CetPipeModes />;
    case "cet-beats-envelope":
      return <CetBeatsEnvelope />;
    case "cet-shm-reference-circle":
      return <CetShmReferenceCircle />;
    case "cet-ydse-fringe-width":
      return <CetYdseFringeWidth />;
    case "cet-doppler-wavefronts":
      return <CetDopplerWavefronts />;
    case "cet-lcr-phasors":
      return <CetLcrPhasors />;
    case "cet-resonance-curve":
      return <CetResonanceCurve />;
    case "cet-lenz-magnet-coil":
      return <CetLenzMagnetCoil />;
    case "cet-continuity-pipe":
      return <CetContinuityPipe />;
    case "cet-dipole-torque":
      return <CetDipoleTorque />;
    case "cet-rolling-energy-split":
      return <CetRollingEnergySplit />;
    case "imat-supply-demand":
      return <ImatSupplyDemand />;
    case "imat-eu-timeline":
      return <ImatEuTimeline />;
    case "imat-italian-institutions":
      return <ImatItalianInstitutions />;
    case "imat-vsepr-shapes":
      return <ImatVseprShapes />;
    case "imat-titration-curve":
      return <ImatTitrationCurve />;
    case "imat-energy-profile":
      return <ImatEnergyProfile />;
    case "imat-catalyst-profile":
      return <ImatCatalystProfile />;
    case "imat-le-chatelier":
      return <ImatLeChatelier />;
    case "imat-aufbau-filling":
      return <ImatAufbauFilling />;
    case "imat-half-life-decay":
      return <ImatHalfLifeDecay />;
    case "imat-moments-seesaw":
      return <ImatMomentsSeesaw />;
    case "imat-snell-refraction":
      return <ImatSnellRefraction />;
    case "imat-em-spectrum":
      return <ImatEmSpectrum />;
    case "imat-superposition":
      return <ImatSuperposition />;
    case "imat-circular-motion":
      return <ImatCircularMotion />;
    case "imat-collision-momentum":
      return <ImatCollisionMomentum />;
    case "imat-syllogism-venn":
      return <ImatSyllogismVenn />;
    case "imat-painted-cube":
      return <ImatPaintedCube />;
    case "imat-grid-routes":
      return <ImatGridRoutes />;
    case "imat-seating-circle":
      return <ImatSeatingCircle />;
    case "imat-paper-folding":
      return <ImatPaperFolding />;
    case "imat-cube-net-fold":
      return <ImatCubeNetFold />;
    case "imat-cardiac-cycle":
      return <ImatCardiacCycle />;
    case "imat-double-circulation":
      return <ImatDoubleCirculation />;
    case "imat-action-potential":
      return <ImatActionPotential />;
    case "imat-synapse":
      return <ImatSynapse />;
    case "imat-sarcomere":
      return <ImatSarcomere />;
    case "imat-cross-bridge":
      return <ImatCrossBridge />;
    case "imat-oxygen-dissociation":
      return <ImatOxygenDissociation />;
    case "imat-hardy-weinberg":
      return <ImatHardyWeinberg />;
    case "imat-selection-types":
      return <ImatSelectionTypes />;
    case "imat-population-growth":
      return <ImatPopulationGrowth />;
    case "imat-bacterial-growth-curve":
      return <ImatBacterialGrowthCurve />;
    case "imat-lytic-lysogenic":
      return <ImatLyticLysogenic />;
    case "imat-sa-volume":
      return <ImatSaVolume />;
    case "imat-meiosis-counts":
      return <ImatMeiosisCounts />;
    case "imat-replication-fork":
      return <ImatReplicationFork />;
    case "imat-transcription":
      return <ImatTranscription />;
    case "imat-translation":
      return <ImatTranslation />;
    case "imat-pcr-cycles":
      return <ImatPcrCycles />;
    case "imat-gel-electrophoresis":
      return <ImatGelElectrophoresis />;
    case "imat-chemiosmosis":
      return <ImatChemiosmosis />;
    case "imat-chloroplast-reactions":
      return <ImatChloroplastReactions />;
    case "imat-enzyme-temp-ph":
      return <ImatEnzymeTempPh />;
    case "imat-michaelis-menten":
      return <ImatMichaelisMenten />;
    case "imat-enzyme-inhibition":
      return <ImatEnzymeInhibition />;
    case "imat-punnett-square":
      return <ImatPunnettSquare />;
    case "imat-pedigree-symbols":
      return <ImatPedigreeSymbols />;
    case "imat-boyle-curve":
      return <ImatBoyleCurve />;
    case "imat-charles-line":
      return <ImatCharlesLine />;
    case "imat-phase-diagram":
      return <ImatPhaseDiagram />;
    case "imat-galvanic-cell":
      return <ImatGalvanicCell />;
    case "imat-chirality-mirror":
      return <ImatChiralityMirror />;
    case "imat-cis-trans":
      return <ImatCisTrans />;
    case "imat-ionisation-jumps":
      return <ImatIonisationJumps />;
    case "imat-graph-transformations":
      return <ImatGraphTransformations />;
    case "imat-trig-graphs":
      return <ImatTrigGraphs />;
    case "imat-sign-chart":
      return <ImatSignChart />;
    case "imat-sector-arc":
      return <ImatSectorArc />;
    case "imat-similar-scaling":
      return <ImatSimilarScaling />;
    case "imat-parallel-angles":
      return <ImatParallelAngles />;
    case "imat-standard-graphs":
      return <ImatStandardGraphs />;
    case "imat-radian-arc":
      return <ImatRadianArc />;
    case "imat-mitosis-steps":
      return <ImatMitosisSteps />;
  }
}

type Props = {
  concept: ConceptUnit;
  /** Globally-unique slug of the parent subtopic — threaded to the report dialog. */
  subtopicSlug: string;
  /** 1-based index used for visual numbering ("Concept 3 of 8"). */
  index: number;
  /** Total concepts in the subtopic — drives the "of N" label. */
  total: number;
  /** Pre-resolved bank PYQ row, or null when pyqExampleId didn't resolve. */
  pyqExample: WorkedExample | null;
  /**
   * Runtime overlay: question UUIDs tagged with this concept in the DB,
   * sourced via `loadResolvedDrills`. Empty array hides the drill link.
   */
  drillQuestionIds: string[];
  /**
   * Internal return path for the /browse "← Back to notes" pill — this
   * subtopic's URL with the concept's anchor (`…/subtopic#concept-slug`).
   * Threaded onto the drill link as `from=`. Omitted → no back pill.
   */
  backHref?: string;
  /** Human label for the back pill, e.g. "Vectors notes". */
  backLabel?: string;
  /** The drill link's /browse kind (lib/notes/countKind.ts `notesBrowseKind`): "all" for an exam
   *  whose notes count practice too, else omitted so the URL stays PYQ-only. */
  browseKind?: "all";
  /**
   * False hides the "report a problem" button. The IMAT preview sets it: the
   * report API only knows PYQ Vault's subtopic slugs. Default true.
   */
  showReport?: boolean;
};

/**
 * One full concept unit in read mode: intuition → definition → formula →
 * authored example → PYQ application → traps. The unit is the atomic
 * learning block; a student reads top-to-bottom and walks away knowing it.
 *
 * Anchored by concept.slug so we can link to specific concepts later.
 */
export default function ConceptUnitCard({
  concept,
  subtopicSlug,
  index,
  total,
  pyqExample,
  drillQuestionIds,
  backHref,
  backLabel,
  browseKind,
  showReport = true,
}: Props) {
  const practiceParts: string[] = [];
  if (concept.selfCheckExample) practiceParts.push("self-check");
  if (concept.practiceSet && concept.practiceSet.length > 0)
    practiceParts.push(`${concept.practiceSet.length} quick reps`);
  const hasPractice = practiceParts.length > 0;

  const practiceBlocks = (
    <>
      {concept.selfCheckExample && (
        <div className="mt-4">
          <SelfCheckCard example={concept.selfCheckExample} conceptSlug={concept.slug} />
        </div>
      )}
      {concept.practiceSet && concept.practiceSet.length > 0 && (
        <div className="mt-4">
          <PracticeSet problems={concept.practiceSet} conceptSlug={concept.slug} />
        </div>
      )}
    </>
  );

  return (
    <section
      id={concept.slug}
      className="scroll-mt-24 rounded-2xl border bg-card p-5 shadow-sm sm:p-8"
    >
      {/* A number badge and the name, not a caps "CONCEPT 1 OF 5" label: the
          page read like a form with a grey caps label over every block. */}
      <header className="mb-5 flex items-start gap-3">
        <span
          className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold tabular-nums text-brand-foreground"
          aria-hidden
        >
          {index}
        </span>
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          <span className="sr-only">
            Concept {index} of {total}:{" "}
          </span>
          {concept.name}
        </h2>
      </header>

      {/* The intuition opens the concept as a lead paragraph (no label); the
          definition sits on a thin brand rule, the way a textbook sets one. */}
      <div className="space-y-5">
        <div className="font-serif text-[17px] leading-relaxed text-foreground">
          <KatexRenderer text={concept.intuition} />
        </div>

        <div className="border-l-2 border-brand/40 pl-4">
          <p className="mb-1 text-xs font-semibold text-brand-accent">Definition</p>
          <RichText
            text={concept.definition}
            className="font-serif text-base leading-relaxed text-foreground"
          />
        </div>
      </div>

      {/* Formula box (formula variant only) */}
      {concept.kind === "formula" && concept.formula && (
        <div className="mt-5">
          <FormulaBlock formula={concept.formula} />
        </div>
      )}

      {/* Interactive visualization — slotted between the formula and the core
          teaching slot in per-concept teaching order. */}
      {concept.visualizationSlug && (
        <div className="notes-figure mt-6">{renderVisualization(concept.visualizationSlug)}</div>
      )}

      {/* Core teaching slot — formula variant gets a worked example;
          reference variant gets the flat reference table in its place. */}
      <div className="mt-6">
        {concept.kind === "formula" ? (
          <WorkedExampleAuthored example={concept.authoredExample} />
        ) : (
          <ReferenceTableBlock table={concept.table} />
        )}
      </div>

      {/* Practice rungs — self-check + Level 1 reps, collapsed behind one
          disclosure to keep the teaching half (intuition → formula → worked
          → traps) visible without scrolling past every concept's practice. */}
      {hasPractice && (
        <details className="group mt-6 rounded-lg border border-violet-200 dark:border-violet-900/60 bg-violet-50/30 dark:bg-violet-950/15">
          <summary className="flex cursor-pointer list-none items-center gap-2 p-4 hover:bg-violet-100/40 dark:hover:bg-violet-950/30">
            <Dumbbell
              className="h-4 w-4 shrink-0 text-violet-700 dark:text-violet-300"
              aria-hidden
            />
            <span className="flex-1 text-sm font-semibold text-violet-800 dark:text-violet-200">
              Practise this concept
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                {practiceParts.join(" · ")}
              </span>
            </span>
            <ChevronRight
              className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90"
              aria-hidden
            />
          </summary>
          <div className="px-4 pb-4">
            <PracticeGate variant="compact" label="try the self-check + reps">
              {practiceBlocks}
            </PracticeGate>
          </div>
        </details>
      )}

      {/* Bank PYQ application — same concept on a real past-year question */}
      {pyqExample && (
        <div className="mt-6">
          <p className="mb-2 text-sm text-muted-foreground">
            {featuredLeadIn(pyqExample.source.kind)}
          </p>
          <WorkedExampleCard rank={index} example={pyqExample} visualSurface="notes" />
        </div>
      )}

      {/* Traps specific to this concept */}
      {concept.traps && concept.traps.length > 0 && (
        <div className="mt-6 space-y-3">
          {concept.traps.map((t, i) => (
            <TrapCallout key={i} title={t.title} body={t.body} />
          ))}
        </div>
      )}

      {/* Footer — report affordance (always) on the left + per-concept drill
          (when tagged questions exist) on the right. The drill sends to
          /browse filtered to exactly these UUIDs, sourced at request time from
          question_concept_tags via loadResolvedDrills. */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t pt-4">
        {showReport && (
          <ReportConceptDialog
            subtopicSlug={subtopicSlug}
            conceptSlug={concept.slug}
            conceptName={concept.name}
          />
        )}
        {drillQuestionIds.length > 0 && (
          <NotesDrillButton
            link="concept"
            label={`Drill ${drillQuestionIds.length} more on ${concept.name.toLowerCase()}`}
            title={concept.name}
            description={`${drillQuestionIds.length} more ${drillQuestionIds.length === 1 ? "question" : "questions"} on this idea`}
            source={{ kind: "ids", ids: drillQuestionIds }}
            fullHref={buildBrowseUrl({
              extraIds: drillQuestionIds,
              kind: browseKind,
              from: backHref,
              fromLabel: backLabel,
            })}
            subtopicSlug={subtopicSlug}
          />
        )}
      </div>
    </section>
  );
}
