
/*
 * This is example of Inferno functional component
 * Functional components provide great performance but does not have state
 */
type T = { number: number };
export function Visualizer({ number: num } : T) {
	return <div className="visualizer">{num}</div>;
}