import useSWR from "swr";
import { API_URL } from "./constants.ts";
import type {
	LanyardGeneric,
	LanyardOptions,
	LanyardResponse,
} from "./types";

export const useLanyard = <T extends LanyardOptions>(
	options: T,
): LanyardGeneric<T> => {
	const apiUrl = options.apiUrl || API_URL;

	return useSWR<LanyardResponse>(
		`lanyard_${options.userId}`,
		async () => {
			const req = await fetch(
				`https://${apiUrl}/v1/users/${options.userId}`,
			);

			const body = (await req.json()) as LanyardResponse;
			if (body.error) throw new Error(body.error.message);

			return body;
		},
	) as LanyardGeneric<T>;
};