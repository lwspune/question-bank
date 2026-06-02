import Link from "next/link";
import { ArrowRight, ChevronRight, Dumbbell, Target } from "lucide-react";
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
import TrapCallout from "./TrapCallout";
import ReferenceTableBlock from "./ReferenceTableBlock";
import ReportConceptDialog from "./ReportConceptDialog";
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
import MagneticForceTriad from "./visualizations/MagneticForceTriad";
import BarMagnetFieldLines from "./visualizations/BarMagnetFieldLines";
import SolenoidFieldLines from "./visualizations/SolenoidFieldLines";
import type { VisualizationSlug } from "@/app/notes/_types";

function renderVisualization(slug: VisualizationSlug) {
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
          <SelfCheckCard example={concept.selfCheckExample} />
        </div>
      )}
      {concept.practiceSet && concept.practiceSet.length > 0 && (
        <div className="mt-4">
          <PracticeSet problems={concept.practiceSet} />
        </div>
      )}
    </>
  );

  return (
    <section
      id={concept.slug}
      className="scroll-mt-20 rounded-xl border bg-card p-6 shadow-sm"
    >
      <header className="mb-5 border-b pb-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          Concept {index} of {total}
        </p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
          {concept.name}
        </h2>
      </header>

      {/* Intuition + definition */}
      <div className="space-y-4">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Intuition
          </p>
          <div className="font-serif text-base leading-relaxed text-foreground">
            <KatexRenderer text={concept.intuition} />
          </div>
        </div>

        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Definition
          </p>
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

      {/* Interactive visualization — slotted between formula and the core
          teaching slot, matching splitNoteIntoSlides' per-concept order. */}
      {concept.visualizationSlug && (
        <div className="mt-6">{renderVisualization(concept.visualizationSlug)}</div>
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
              Practice this concept
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                {practiceParts.join(" · ")}
              </span>
            </span>
            <ChevronRight
              className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90"
              aria-hidden
            />
          </summary>
          <div className="px-4 pb-4">{practiceBlocks}</div>
        </details>
      )}

      {/* Bank PYQ application — same concept on a real past-year question */}
      {pyqExample && (
        <div className="mt-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            From the bank · past-year question
          </p>
          <WorkedExampleCard rank={index} example={pyqExample} />
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
        <ReportConceptDialog
          subtopicSlug={subtopicSlug}
          conceptSlug={concept.slug}
          conceptName={concept.name}
        />
        {drillQuestionIds.length > 0 && (
          <Link
            href={buildBrowseUrl({
              extraIds: drillQuestionIds,
              from: backHref,
              fromLabel: backLabel,
            })}
            className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/10"
          >
            <Target className="h-3.5 w-3.5" aria-hidden />
            Drill {drillQuestionIds.length} more on {concept.name.toLowerCase()}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        )}
      </div>
    </section>
  );
}
